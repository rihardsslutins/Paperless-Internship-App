//style
import "./Inputs.css";
// hooks
import useTheme from "../../../hooks/useTheme";

const Textarea = ({ id, onChange, type, name }) => {
    const theme = useTheme();
    return (
        <textarea
            className={`input-textarea ${theme}`}
            type={type}
            name={name}
            id={id}
            onChange={onChange}
        />
    );
};

export default Textarea;