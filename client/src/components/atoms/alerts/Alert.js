// style
import "./Alerts.css";
// assets
import closeCircle from "../../../assets/closeCircle.svg";

const Alert = ({
    type,
    text,
    handleAlertClose
}) => {
    return (
        <div className={`alert-box ${type}`}>
            <img src={require(`../../../assets/${type}.svg`)} alt={`${type} alert icon`} />
            <div className="alert-text">{text}</div>
            <img className="close-alert" src={closeCircle} alt={`close ${type} alert`} onClick={handleAlertClose} />
        </div>
    );
}
 
export default Alert;