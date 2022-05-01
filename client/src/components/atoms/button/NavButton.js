//style
import "./ButtonStyles.css";

const NavButton = ({ text, active }) => {
    return (
        <div>
            <button className={`nav-button${active}`}>{text}</button>
        </div>
    );
};

export default NavButton;
