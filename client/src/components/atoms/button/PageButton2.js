//style
import "./ButtonStyles.css";

const PageButton2 = ({ onClick, text, active }) => {
    return (
        <>
            <button className={`page-button-2${active}`} onClick={onClick}>{text}</button>
        </>
    );
};

export default PageButton2;