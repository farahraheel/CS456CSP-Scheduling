import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import MeetingModel, { Rooms } from "../../../Models/MeetingModel";
import TeamModel from "../../../Models/TeamModel";
import meetingsService from "../../../Services/MeetingsService";

import "./AddMeeting.css";

function AddMeeting(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();

    const suggestion = location.state as { startTime?: string; endTime?: string; room?: string; teamId?: number } | null;

    const [teams, setTeams] = useState<TeamModel[]>([]);

    const { register, handleSubmit, setValue } = useForm<MeetingModel>();

    useEffect(() => {
        meetingsService.getAllTeams()
            .then(setTeams)
            .catch(err => alert("Failed to load teams: " + err.message));
    }, []);

    useEffect(() => {
        if (suggestion) {
            if (suggestion.teamId) setValue("teamId", suggestion.teamId);
            if (suggestion.startTime) setValue("startTime", suggestion.startTime);
            if (suggestion.endTime) setValue("endTime", suggestion.endTime);
            if (suggestion.room) setValue("room", suggestion.room as Rooms);
        }
    }, [suggestion, setValue]);

    async function send(meeting: MeetingModel) {
        if (new Date(meeting.startTime).getTime() >= new Date(meeting.endTime).getTime()) {
            alert("End time must be after start time.");
            return;
        }

        try {
            await meetingsService.addMeeting(meeting);
            alert("Meeting has been added successfully.");
            navigate("/list");
        } catch (err: any) {
            if (err.response?.status === 409 && err.response.data?.suggestion) {
                const suggestion = err.response.data.suggestion;

                const start = suggestion.startTime && !isNaN(Date.parse(suggestion.startTime))
                    ? new Date(suggestion.startTime).toLocaleString()
                    : "Unavailable";

                const end = suggestion.endTime && !isNaN(Date.parse(suggestion.endTime))
                    ? new Date(suggestion.endTime).toLocaleString()
                    : "Unavailable";

                const room = suggestion.room || "Unavailable";

                alert(
                    "Conflict detected!\n" +
                    `Suggested Start: ${start}\n` +
                    `Suggested End: ${end}\n` +
                    `Suggested Room: ${room}`
                );

                // توجيه المستخدم لصفحة الاقتراح إن أردت:
                navigate(`/suggest/${meeting.teamId}`, {
                    state: { ...suggestion, teamId: meeting.teamId }
                });

            } else {
                alert("Failed to add meeting: " + (err.message || "Unknown error"));
            }
        }
    }

    return (
        <div className="AddMeeting">
            <h2>Add Meeting</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Select Team:</label>
                <select {...register("teamId", { valueAsNumber: true })} required>
                    <option disabled value="">-- Select Team --</option>
                    {teams.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>

                <label>Start of Meeting:</label>
                <input type="datetime-local" {...register("startTime")} required />

                <label>End of Meeting:</label>
                <input type="datetime-local" {...register("endTime")} required />

                <label>Description:</label>
                <input type="text" {...register("description")} required minLength={1} maxLength={100} />

                <label>Meeting Room:</label>
                <select {...register("room")} required>
                    <option disabled value="">-- Select Room --</option>
                    {Object.values(Rooms).map(room => (
                        <option key={room} value={room}>{room}</option>
                    ))}
                </select>

                <button type="submit">Add</button>
            </form>
        </div>
    );
}

export default AddMeeting;
