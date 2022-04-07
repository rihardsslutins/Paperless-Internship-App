const Input = ({ onChange, placeholder, type }) => {
    return (
        <div>
            <input type={type} placeholder={placeholder} onChange={onChange} />
        </div>
    );
};

export default Input;
