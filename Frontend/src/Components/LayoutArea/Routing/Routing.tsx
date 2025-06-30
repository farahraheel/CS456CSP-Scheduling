import { Navigate, Route, Routes } from "react-router-dom";
import Insert from "../../DataArea/Insert/AddMeeting";
import List from "../../DataArea/List/List";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import SuggestMeeting from "../../SuggestArea/SuggestMeeting";

import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/insert" element={<Insert />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/suggest/:teamId" element={<SuggestMeeting />} /> {/* تعديل هنا لتمرير teamId */}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default Routing;
