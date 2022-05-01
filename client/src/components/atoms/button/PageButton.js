//style
import "./ButtonStyles.css";

const PageButton = ({ onClick, text }) => {
    return (
        <div>
            <button className="page-button" onClick={onClick}>{text}</button>
        </div>
    );
};

export default PageButton;