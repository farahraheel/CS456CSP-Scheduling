import "./Home.css";
import calendarImage from "../../../Assets/Images/calendar2.jpg";


function Home(): JSX.Element {
    return (
        <div className="Home">
            <p> Welcome!  <br/>
            Here you can view all the meetings and add new ones </p>
            <img src={calendarImage} />
        </div>
    );
}

export default Home;
