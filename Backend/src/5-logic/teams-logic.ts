import dal from "../2-utils/dal";
import TeamModel from "../4-models/team-model";
import logger from "../2-utils/logger";  // استيراد الـ logger

async function getAllTeams(): Promise<TeamModel[]> {
    try {
        const sql = `SELECT * FROM teams`;
        const teams = await dal.execute(sql);
        return teams;
    } catch (err: any) {
        await logger(`Failed to get all teams: ${err.message}`);
        throw err; // تعيد رمي الخطأ عشان يطلع لفوق ويتعامل معاه الباقي من النظام
    }
}

export default {
    getAllTeams
};
