import { CSPDomains, Assignment, MeetingSlot } from "./types";
import { isConsistent } from "./constraints";


export function backtrack(
  assignment: Assignment,
  domains: CSPDomains
): Assignment | null {

  // إذا تم تعيين قيم لكل المتغيرات، نكون قد وجدنا حلًا
  if (Object.keys(assignment).length === Object.keys(domains).length) {
    return assignment;
  }

  // الحصول على المتغيرات غير المعينة بعد
  const unassignedVars = Object.keys(domains).filter(v => !(v in assignment));

  // اختيار المتغير ذو أصغر مجال (heuristic): لتقليل تعقيد البحث
  let variable = unassignedVars[0];
  let minDomainSize = domains[variable].length;

  for (const v of unassignedVars) {
    if (domains[v].length < minDomainSize) {
      variable = v;
      minDomainSize = domains[v].length;
    }
  }

  // تجربة كل قيمة ممكنة في مجال المتغير المختار
  for (const value of domains[variable]) {
    // التحقق من أن التعيين الحالي متوافق مع القيود
    if (isConsistent(assignment, variable, value)) {
      assignment[variable] = value;

      // عمل نسخة من المجالات لتعديلها أثناء التحقق (forward checking)
      const newDomains: CSPDomains = { ...domains };

      let failure = false;
      // تحديث المجالات للمتغيرات غير المعينة بناءً على التعيين الجديد
      for (const v of unassignedVars) {
        if (v === variable) continue;
        newDomains[v] = newDomains[v].filter(candidate =>
          isConsistent({ ...assignment, [v]: candidate }, v, candidate)
        );
        // إذا أصبح مجال أي متغير فارغًا، فهناك فشل ويجب التراجع
        if (newDomains[v].length === 0) {
          failure = true;
          break;
        }
      }

      // إذا لم يكن هناك فشل، نتابع البحث العودي
      if (!failure) {
        const result = backtrack(assignment, newDomains);
        if (result) return result;
      }

      // إذا فشل البحث مع هذه القيمة، نحذف التعيين ونجرب قيمة أخرى
      delete assignment[variable];
    }
  }

  
  return null;
}
