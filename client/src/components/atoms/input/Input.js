const Input = ({ id, onChange, placeholder, type, name }) => {
    return (
        <div>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
