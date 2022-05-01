// style
import "./Inputs.css";

const RadioInput = ({
    radioLabel,
    name,
    id,
    defaultChecked,
    text
}) => {
    return (
        <label className="radio-input-item" htmlFor={radioLabel}>
            <input className="radio-input-field" type="radio" name={name} id={id} defaultChecked={defaultChecked}/>
            <span className="radio-checkmark"></span>
            {text}
        </label>
    );
}
 
export default RadioInput;