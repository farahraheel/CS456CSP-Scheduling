import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import meetingsService from "../../../src/Services/MeetingsService";

function SuggestMeeting(): JSX.Element {
    const [suggestion, setSuggestion] = useState<{ startTime: string; endTime: string; room: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const { teamId } = useParams<{ teamId: string }>();  // قراءة teamId من الرابط

    useEffect(() => {
        async function fetchSuggestion() {
            if (!teamId) {
                setError("No team ID provided.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const result = await meetingsService.suggestMeeting(+teamId); // تحويل لـ number
                setSuggestion(result);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch suggestion", err);
                setError("Failed to fetch meeting suggestion.");
                setLoading(false);
            }
        }
        fetchSuggestion();
    }, [teamId]);

    return (
        <div className="SuggestMeeting">
            <h2>Suggested Meeting Time</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : suggestion ? (
                <>
                    <p><strong>Start Time:</strong> {new Date(suggestion.startTime).toLocaleString()}</p>
                    <p><strong>End Time:</strong> {new Date(suggestion.endTime).toLocaleString()}</p>
                    <p><strong>Room:</strong> {suggestion.room}</p>
                </>
            ) : (
                <p>No available meeting slot found.</p>
            )}

            <button onClick={() => navigate("/insert")}>Add a New Meeting</button>
        </div>
    );
}

export default SuggestMeeting;
