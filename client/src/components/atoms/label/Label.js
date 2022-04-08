const Label = ({ id, text }) => {
    return (
        <div>
            <label htmlFor={id}>{text}</label>
        </div>
    );
};

export default Label;
