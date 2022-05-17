//style
import "./Inputs.css";

const Textarea = ({ id, onChange, type, name }) => {
    return (
        <textarea
            className="input-textarea"
            type={type}
            name={name}
            id={id}
            onChange={onChange}
        />
    );
};

export default Textarea;