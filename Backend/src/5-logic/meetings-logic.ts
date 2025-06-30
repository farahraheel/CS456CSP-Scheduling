import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import MeetingModel, { Rooms } from "../4-models/meeting-model"; // تأكد من تصدير Rooms من نفس الملف
import { ResourceNotFoundErrorModel, ConflictErrorModel } from "../4-models/error-models";
import { suggestMeetingTime } from "../algorithm/csp/scheduler";

async function getAllMeetingsByTeams(teamId: number): Promise<MeetingModel[]> {
    const sql = `SELECT M.id,
        M.teamId,
        DATE_FORMAT(startTime, '%Y-%m-%dT%H:%i:%s') AS startTime,  -- ISO format أسهل للـ frontend
        DATE_FORMAT(endTime, '%Y-%m-%dT%H:%i:%s') AS endTime,
        M.description,
        M.room,
        T.name         
        FROM meetings AS M
        JOIN teams AS T
        ON M.teamId = T.id
        WHERE M.teamId = ?`;

    const teams = await dal.execute(sql, [teamId]);
    return teams;
}

async function addMeeting(meeting: MeetingModel): Promise<MeetingModel> {
    // فحص تعارض المواعيد
    const conflictSql = `
        SELECT COUNT(*) AS count
        FROM meetings
        WHERE teamId = ?
          AND (
            (startTime < ? AND endTime > ?) 
            OR
            (startTime >= ? AND startTime < ?)
          )
    `;
    const result: { count: number }[] = await dal.execute(conflictSql, [
        meeting.teamId,
        meeting.endTime,
        meeting.startTime,
        meeting.startTime,
        meeting.endTime
    ]);

    if (result[0].count > 0) {
        // لو فيه تعارض، نرجع الاقتراح
        const suggestion = await suggestMeeting(meeting.teamId);
        throw new ConflictErrorModel(suggestion);
    }

    const sql = `INSERT INTO meetings VALUES(
        DEFAULT,
        ?,
        ?,
        ?,
        ?,
        ?
    )`;
    const info: OkPacket = await dal.execute(sql, [
        meeting.teamId,
        meeting.startTime,
        meeting.endTime,
        meeting.description,
        meeting.room
    ]);
    meeting.id = info.insertId;
    return meeting;
}

async function deleteMeeting(meetingId: number): Promise<void> {
    const sql = `DELETE FROM meetings WHERE id = ?`;
    const info: OkPacket = await dal.execute(sql, [meetingId]);
    if (info.affectedRows === 0) throw new ResourceNotFoundErrorModel(meetingId);
}

interface SuggestionModel {
    startTime: string;
    endTime: string;
    room: Rooms;
}

async function suggestMeeting(teamId: number): Promise<SuggestionModel> {
    // من المفترض أن الدالة ترجع هذا الكائن:
    const suggestion = await suggestMeetingTime(teamId);
    // تأكد أن suggestMeetingTime يعيد كائن مطابق لـ SuggestionModel
    return suggestion;
}

export default {
    getAllMeetingsByTeams,
    addMeeting,
    deleteMeeting,
    suggestMeeting
};
