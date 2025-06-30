import { ChangeEvent, useEffect, useState } from "react";
import MeetingModel from "../../../Models/MeetingModel";
import TeamModel from "../../../Models/TeamModel";
import meetingsService from "../../../Services/MeetingsService";
import MeetingCards from "../MeetingCards/MeetingCards";
import "./List.css";

function List(): JSX.Element {

    const [teams, setTeams] = useState<TeamModel[]>([]);
    const [meetings, setMeetings] = useState<MeetingModel[]>([]);

    useEffect(() => {
        meetingsService.getAllTeams()
            .then(teams => setTeams(teams))
            .catch(err => alert(err.message));
    }, []);

    // HTMLSelectElement --> element raising the event
    async function getMeetings(args: ChangeEvent<HTMLSelectElement>) { 
        const value = +args.target.value;
        meetingsService.getMeetingsByTeams(value)
            .then(meetings => setMeetings(meetings))
            .catch(err => alert(err.message));
    }

    return (
        <div className="List">
            
            <label>Select Team: </label>
            <select defaultValue="" onChange={getMeetings}>
                <option disabled value="">Select...</option>
                {teams.map(t =>
                    <option key={t.id} value={t.id}>
                        {t.name}
                    </option>
                )}
            </select>
            <br />
            <br />
            {meetings.map(m => <MeetingCards key={m.id} meeting={m}  />)}
        </div>
    );
}

export default List;
