// atoms
import Input from '../../atoms/input/Input';
import Label from '../../atoms/label/Label';

const LabeledInput = ({ id, onChange, type, name, placeholder, text }) => {
    return (
        <div>
            <Label id={id} text={text} />
            <Input
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default LabeledInput;
