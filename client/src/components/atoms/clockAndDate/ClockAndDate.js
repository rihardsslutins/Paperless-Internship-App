// style
import "./ClockAndDate.css";
// hooks
import { useState, useEffect } from "react";

const ClockAndDate = ({
    displayClock,
    displayTodaysDate
}) => {
    const [clock, setClock] = useState();
    const days = ['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena'];
    const months = ['janvāris', 'februāris', 'marts', 'aprilis', 'maijs', 'jūnijs', 'jūlijs', 'augusts', 'septembris', 'oktobris', 'novembris', 'decembris'];
    
    const today = new Date();
    const todaysDate = days[today.getDay()] + ', ' + today.getFullYear() + '. gada ' + today.getDate() + '. ' + months[today.getMonth()];

    useEffect(() => {
        setInterval(() => {
            const time = new Date();
            setClock(time.toLocaleTimeString('en-GB'));
        }, 1000);
    }, []);

    return (
        <div className="clock-todays-date">
            {displayTodaysDate && <p>{todaysDate}</p>}
            {displayClock && <p><b>{clock}</b></p>}
        </div>
    );
}
 
export default ClockAndDate;