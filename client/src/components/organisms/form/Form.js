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
    text,
    onClick,
    ButtonText,
}) => {
    let inputArray = [];
    for (let i = 0; i < name.length; i++) {
        inputArray.push(
            <LabeledInput type={type} name={name[i]} text={text[i]} />
        );
    }
    return (
        <div>
            <form>
                {inputArray.map((element) => element)}
                <Button onClick={onClick} text={ButtonText} />
            </form>
        </div>
    );
};

export default Form;
