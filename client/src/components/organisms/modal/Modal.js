// atoms
import PageButton from "../../atoms/button/PageButton";
// assets
import menuCloseBlack from "../../../assets/menuCloseBlack.svg"
// style
import "./Modal.css";
import { Link } from "react-router-dom";

const Modal = ({title, body, display, handleClose}) => {

    return (
        <>
        {display && <div className="modal">
            <div className="modal-content">
                <div className="modal-head">
                    <img src={menuCloseBlack} alt="close modal" onClick={handleClose} />
                    <h2>{title}</h2>
                </div>
                <p>{body}</p>
                <Link to={'/register'}><PageButton text="Reģistrēties" /></Link>
            </div>
        </div>
        }
        </>
    );
}
 
export default Modal;