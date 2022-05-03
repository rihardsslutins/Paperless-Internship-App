import { Link } from "react-router-dom";
import menuOpen from "../../../assets/menuOpen.svg";

//atoms
import NavButton from "../../atoms/button/NavButton";

//style
import "./NavbarStyle.css";

const Navbar = ({ page }) => {
    return (
        <div className="navbar">
            <h2 className="logo"><Link to={'/'}>Prakses uzskaites sistēma</Link></h2>
            <div className="nav-toggle">
                <label htmlFor="toggle-menu">
                    <img src={menuOpen} alt="menu" className="menu-open" />
                </label> 
            </div>
            <input type="checkbox" id="toggle-menu" />
            <ul className="nav-links">
                <li><Link to={'/register'}><NavButton text="Reģistrēties" active={page === 'register' ? '-active' : ''} /></Link></li>
                <li><Link to={'/login'}><NavButton text="Pieslēgties" active={page === 'login' ? '-active' : ''} /></Link></li>
            </ul>
        </div>
    );
}
 
export default Navbar;