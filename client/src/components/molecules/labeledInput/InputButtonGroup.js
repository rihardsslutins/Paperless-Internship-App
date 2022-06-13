// style
import "./InputGroup.css";
// atoms
import Input from "../../atoms/input/Input";
import PageButton from "../../atoms/button/PageButton";

const InputButtonGroup = ({
    type,
    onChange,
    name,
    placeholder,
    text,
    onClick
}) => {
    return (
        <div className="input-button-group">
            <Input 
                type={type}
                onChange={onChange}
                name={name}
                placeholder={placeholder}
            />
            <PageButton text={text} onClick={onClick} />
        </div>
    );
}
 
export default InputButtonGroup;