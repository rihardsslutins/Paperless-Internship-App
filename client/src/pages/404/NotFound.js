// style
import "./NotFound.css";
// assets
import NotFoundImage from "../../assets/404.png";
import PageButton from "../../components/atoms/button/PageButton";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found-info">
                <h1>Lapa, kuru meklējat, neeksistē!</h1>
                <h2>Pārbaudiet adresi un mēģiniet velreiz vai arī dodaties uz sākuma lapu.</h2>
                <Link to="/" ><PageButton text="Sākuma lapa" /></Link>
            </div>
            <img src={NotFoundImage} alt="Not found" />
        </div>
    );
}
 
export default NotFound;