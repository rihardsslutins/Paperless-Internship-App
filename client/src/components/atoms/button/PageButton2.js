//style
import "./ButtonStyles.css";

const PageButton2 = ({ onClick, text, active }) => {
    return (
        <div>
            <button className={`page-button-2${active}`} onClick={onClick}>{text}</button>
        </div>
    );
};

export default PageButton2;