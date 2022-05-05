// style
import "./Alerts.css";
// assets
import closeCircle from "../../../assets/closeCircle.svg";

import { useState } from "react";

const Alert = ({
    active,
    type,
    text
}) => {

    const [display, setDisplay] = useState(active);

    const handleClose = () => {
        setDisplay(false);
    }

    return (
        <>
            {display && 
                <div className={`alert-box ${type}`}>
                    <img src={require(`../../../assets/${type}.svg`)} alt={`${type} alert icon`} />
                    <div className="alert-text">{text}</div>
                    <img className="close-alert" src={closeCircle} alt={`close ${type} alert`} onClick={handleClose} />
                </div>
            }
        </>
    );
}
 
export default Alert;