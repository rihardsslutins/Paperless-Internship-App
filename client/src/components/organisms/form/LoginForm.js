// style
import "./Forms.css";
// atoms
import PageButton from '../../atoms/button/PageButton';
// molecules
import InputGroup from '../../molecules/labeledInput/InputGroup';

const LoginForm = ({
    id,
    onChange,
    type,
    name,
    label,
    onClick,
    buttonText,
}) => {
    let inputArray = [];
    for (let i = 0; i < name.length; i++) {
        inputArray.push(
            <InputGroup
                id={id[i]}
                onChange={onChange[i]}
                type={type[i]}
                name={name[i]}
                label={label[i]}
                key={[i]}
            />
        );
    }
    return (
        <div className="login-form">
            <form>
                {inputArray.map((element) => element)}
                <PageButton onClick={onClick} text={buttonText} />
            </form>
        </div>
    );
};

export default LoginForm;
