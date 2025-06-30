import dal from "../../2-utils/dal";
import { backtrack } from "../csp/backtrack";
import { MeetingSlot, CSPDomains, Assignment } from "./types";
import { Rooms } from "../../4-models/meeting-model";


function generateCandidateSlots(date: string): MeetingSlot[] {
  const baseDate = new Date(date + "T09:00:00");
  const slots: MeetingSlot[] = [];
  const rooms = [Rooms.RED, Rooms.BLUE, Rooms.GREEN];

  // توليد فترات زمنية لكل ساعة من 9 إلى 16 (آخر بداية فترة) لكل غرفة
  for (let hour = 9; hour < 17; hour++) {
    for (const room of rooms) {
      const startTime = new Date(baseDate);
      startTime.setHours(hour, 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(hour + 1);

      slots.push({
        startTime: startTime.toISOString().slice(0, 19).replace('T', ' '), // تحويل إلى صيغة قابلة للعرض/القاعدة
        endTime: endTime.toISOString().slice(0, 19).replace('T', ' '),
        room,
      });
    }
  }
  return slots;
}

/**
 * التحقق ما إذا كان وقت الاجتماع داخل الساعات المسموح بها (9 صباحًا - 5 مساءً).
 * @param slot فترة زمنية للاجتماع
 * @returns true إذا داخل الساعات، false خلاف ذلك
 */
function isWithinAllowedHours(slot: MeetingSlot): boolean {
  const start = new Date(slot.startTime);
  const end = new Date(slot.endTime);

  const allowedStartHour = 9;
  const allowedEndHour = 17;

  // التحقق أن بداية ونهاية الاجتماع في نفس اليوم
  if (start.toDateString() !== end.toDateString()) return false;

  // التحقق من الساعات المسموح بها
  if (start.getHours() < allowedStartHour || end.getHours() > allowedEndHour) return false;

  return true;
}

/**
 * اقتراح وقت اجتماع جديد لفريق معين، بناءً على الأوقات المحجوزة مسبقًا.
 * يستخدم خوارزمية backtracking مع CSP لاختيار وقت مناسب.
 * 
 * @param teamId رقم تعريف الفريق
 * @returns وقت اجتماع مقترح (MeetingSlot) أو null إذا لم يوجد وقت مناسب
 */
export async function suggestMeetingTime(teamId: number): Promise<MeetingSlot | null> {

  // جلب الاجتماعات الحالية للفريق، مرتبة تنازليًا حسب وقت النهاية
  const sql = `SELECT startTime, endTime, room FROM meetings WHERE teamId = ? ORDER BY endTime DESC`;
  const existing = await dal.execute(sql, [teamId]);

  // تحويل النتائج إلى كائنات MeetingSlot
  const existingSlots: MeetingSlot[] = existing.map((m: any) => ({
    startTime: m.startTime,
    endTime: m.endTime,
    room: m.room as Rooms,
  }));

  // تحديد آخر وقت انتهاء اجتماع، أو وقت افتراضي قبل بداية الدوام
  let lastMeetingEndTime = existingSlots.length > 0 ? new Date(existingSlots[0].endTime) : new Date();
  lastMeetingEndTime.setHours(8, 59, 59, 0); // قبل بداية العمل (9:00)

  // إنشاء قائمة الفترات الزمنية المرشحة ليوم اليوم
  const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
  const candidateSlots = generateCandidateSlots(today);

  // فلترة الفترات التي تبدأ بعد آخر اجتماع للفريق
  const filteredSlots = candidateSlots.filter(slot => {
    const slotStart = new Date(slot.startTime);
    return slotStart > lastMeetingEndTime;
  });

  // فلترة الفترات التي ضمن الساعات المسموح بها والتي لا تتعارض مع الاجتماعات الحالية
  const validSlots = filteredSlots.filter(candidate =>
    isWithinAllowedHours(candidate) &&
    !existingSlots.some(existing =>
      existing.room === candidate.room &&
      (candidate.startTime < existing.endTime && candidate.endTime > existing.startTime) // شرط تداخل الأوقات
    )
  );

  // تحضير بيانات المجال (domains) والتعيين الفارغ (assignment) لـ CSP
  const domains: CSPDomains = { newMeeting: validSlots };
  const assignment: Assignment = {};

  // البحث عن حل مناسب باستخدام دالة backtrack
  const result = backtrack(assignment, domains);

  // إذا وجدنا حل نرجع الفاصل الزمني، وإلا نرجع null
  return result ? result["newMeeting"] : null;
}
