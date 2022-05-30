//style
import "./Inputs.css";

const Input = ({ 
    id, 
    onChange, 
    type, 
    name,
    value,
    placeholder 
}) => {
    return (
        <input
            className="input-field"
            type={type}
            name={name}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Input;
