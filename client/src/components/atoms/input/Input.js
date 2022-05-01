//style
import "./Inputs.css";

const Input = ({ id, onChange, type, name }) => {
    return (
        <input
            className="input-field"
            type={type}
            name={name}
            id={id}
            onChange={onChange}
        />
    );
};

export default Input;
