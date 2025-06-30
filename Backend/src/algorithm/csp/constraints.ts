import { Assignment, MeetingSlot } from "./types";


export function isConsistent(
  assignment: Assignment, 
  variable: string, 
  value: MeetingSlot
): boolean {
  // نفحص كل التعيينات الحالية
  for (const key in assignment) {
    const assignedSlot = assignment[key];
    if (assignedSlot) {
      // شرط التحقق: 
      // إذا كانت الغرفة واحدة وتوقيت الاجتماع الجديد يتداخل مع موعد موجود بالفعل
      if (
        assignedSlot.room === value.room &&
        assignedSlot.startTime < value.endTime &&
        assignedSlot.endTime > value.startTime
      ) {
        // وجدنا تعارض في الغرفة والوقت، إذن التعيين غير متوافق
        return false; 
      }
    }
  }
  // إذا لم نجد أي تعارض، التعيين متوافق
  return true; 
}
