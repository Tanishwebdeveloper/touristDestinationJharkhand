import { useState } from "react";
import Summary from "./Summary/Summary.jsx";
import Navbar from "./MainBar/Navbar.jsx";
import MainBar from "./MainBar/MainBar.jsx";
import "./AnalyticsDashboard.css";

export default function AnalyticsDashBoard(){
    const [activeTab, setActiveTab] = useState('revenue');

    return (
        <>
            <div className="Dashboard">
                <Summary/>
                <Navbar active={activeTab} onChange={setActiveTab} />
                <MainBar active={activeTab} />
            </div>
        </>
    )
}