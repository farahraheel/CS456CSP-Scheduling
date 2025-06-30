import axios from "axios";
import MeetingModel from "../Models/MeetingModel";
import TeamModel from "../Models/TeamModel";
import appConfig from "../Utils/Config";

class MeetingsService {

    public async getAllTeams(): Promise<TeamModel[]> {
        const response = await axios.get<TeamModel[]>(appConfig.teamsUrl);
        return response.data;
    }

    public async getMeetingsByTeams(teamId: number): Promise<MeetingModel[]> {
        const response = await axios.get<MeetingModel[]>(`${appConfig.meetingsUrl}/${teamId}`);
        return response.data;
    }

    public async addMeeting(meeting: MeetingModel): Promise<void> {
        await axios.post<MeetingModel>(appConfig.meetingsUrl, meeting);
    }

    public async deleteMeeting(id: number): Promise<void> {
        await axios.delete(`${appConfig.meetingsUrl}/${id}`);
    }

    public async suggestMeeting(teamId: number): Promise<{ startTime: string; endTime: string; room: string } | null> {
        const response = await axios.get(`${appConfig.meetingsUrl}/suggest/${teamId}`);
        return response.data;
    }
}

const meetingsService = new MeetingsService();

export default meetingsService;
