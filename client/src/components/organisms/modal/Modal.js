// atoms
import PageButton from "../../atoms/button/PageButton";
// assets
import closeBlack from "../../../assets/closeBlack.svg"
// style
import "./Modal.css";
import { Link } from "react-router-dom";

const Modal = ({title, body, display, handleClose, buttonText, role}) => {

    return (
        <>
        {display && <div className="modal">
            <div className="modal-content">
                <div className="modal-head">
                    <img src={closeBlack} alt="close modal" onClick={handleClose} />
                    <h2>{title}</h2>
                </div>
                <p>{body}</p>
                <Link to={`/register?role=${role}`}><PageButton text={buttonText} /></Link>
            </div>
        </div>
        }
        </>
    );
}
 
export default Modal;