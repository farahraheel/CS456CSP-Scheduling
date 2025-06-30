import MeetingModel from "../../../Models/MeetingModel";
import "./MeetingCards.css";


interface MeetingCardsProps {
    meeting: MeetingModel;
}

function MeetingCards(props: MeetingCardsProps): JSX.Element {
    return (
        <div className="MeetingCards">
			<div className="Container">
                <span>Room: {props.meeting.room}</span>
                <br />
                <span>Description: {props.meeting.description}</span>
                <br />
                <span>Start time: {props.meeting.startTime}</span>
                <br />
                <span>Until: {props.meeting.endTime}</span>
            </div>
        </div>
    );
}

export default MeetingCards;
