// style
import "./Forms.css";
// atoms
import PageButton from "../../atoms/button/PageButton";
// molecules
import InputGroup from '../../molecules/labeledInput/InputGroup';
import InputRadioGroup from '../../molecules/labeledInput/InputRadioGroup';

const RegistrationForm = ({
    id,
    onChange,
    type,
    name,
    label,
    onClick,
    buttonText,
    radioOnClick,
}) => {

    const radioLabel = ['male', 'female'];
    const radioName = ['gender', 'gender'];
    const radioValue = ['male', 'female']
    const radioId = ['male', 'female'];
    const radioText = ['Vīrietis', 'Sieviete'];
    let inputArray = [];
    for (let i = 0; i < name.length; i++) {
        if(i === 3) {
            inputArray.push(
                <InputRadioGroup radioGroupLabel="Dzimums:" radioLabel={radioLabel} name={radioName} id={radioId} text={radioText} radioOnClick={radioOnClick} radioValue={radioValue} />
            );
        }
        inputArray.push(
            <InputGroup
                id={id[i]}
                customClass={label[i] === 'Amats:' ? '-wide' : ''}
                onChange={onChange[i]}
                type={type[i]}
                name={name[i]}
                label={label[i]}
                key={[i]}
            />
        );
    }

    return (
        <div className="registration-form">
            <form>
                <div className="registration-form-grid">
                    {inputArray.map((element) => element)}
                </div>
                <PageButton onClick={onClick} text={buttonText} />
            </form>
        </div>
    );
}
 
export default RegistrationForm;