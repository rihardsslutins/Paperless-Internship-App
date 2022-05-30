// style
import "./Forms.css";
// atoms
import PageButton from "../../atoms/button/PageButton";
// molecules
import InputGroup from "../../molecules/labeledInput/InputGroup";
import TextareaGroup from "../../molecules/labeledInput/TextareaGroup";

const JournalRecordForm = ({
    id,
    name,
    label,
    type,
    onClick,
    onChange,
    buttonText
}) => {
    let inputArray = [];
    for (let i = 0; i < name.length; i++) {
        if(i === 1) {
            inputArray.push(
                <TextareaGroup 
                    id={id[i]}
                    onChange={onChange[i]}
                    type={type[i]}
                    name={name[i]}
                    label={label[i]}
                    key={[i]} 
                />
            );
        } else {
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
    }
    return (
        <form className="journal-record-form">
            {inputArray.map((element) => element)}
            <PageButton onClick={onClick} text={buttonText} />
        </form>
    );
}
 
export default JournalRecordForm;