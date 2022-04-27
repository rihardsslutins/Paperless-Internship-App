// atoms
import Button from '../../atoms/button/Button';

// molecules
import LabeledInput from '../../molecules/labeledInput/LabeledInput';

const Form = ({
    id,
    onChange,
    type,
    name,
    placeholder,
    label,
    onClick,
    buttonText,
}) => {
    let inputArray = [];
    for (let i = 0; i < name.length; i++) {
        inputArray.push(
            <LabeledInput
                id={id[i]}
                onChange={onChange[i]}
                type={type}
                name={name[i]}
                placeholder={placeholder}
                label={label[i]}
            />
        );
    }
    return (
        <div>
            <form>
                {inputArray.map((element) => element)}
                <Button onClick={onClick} text={buttonText} />
            </form>
        </div>
    );
};

export default Form;
