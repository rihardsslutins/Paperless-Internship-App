const Label = ({ id, label }) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default Label;
