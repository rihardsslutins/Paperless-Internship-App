// style
import "./Inputs.css";

const RadioInput = ({
    radioLabel,
    name,
    id,
    text,
    radioOnClick,
    radioValue
}) => {
    return (
        <label className="radio-input-item" htmlFor={radioLabel}>
            <input className="radio-input-field" type="radio" name={name} id={id} value={radioValue} onClick={radioOnClick}/>
            <span className="radio-checkmark"></span>
            {text}
        </label>
    );
}
 
export default RadioInput;