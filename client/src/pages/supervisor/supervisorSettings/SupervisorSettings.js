// style
import "./SupervisorSettings.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
import lightMode from "../../../assets/lightMode.svg";
import darkMode from "../../../assets/darkMode.svg";
// atoms
import DangerButton from "../../../components/atoms/button/DangerButton";
import PageButton from "../../../components/atoms/button/PageButton";
// components
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import DeleteProfileModal from "../../../components/organisms/modal/DeleteProfileModal";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SupervisorSettings = () => {

    const navigate = useNavigate();

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

    // Logged in users info
    const supervisor = { 
        id: 'uiytcfdg6hjnrv7bm12ee3',
        name: "Juris",
        surname: "Ozols",
        phone: 28490186,
        email: "ozols123@gmail.com",
        gender: "male",
        company: "Accenture",
        field: "Full Stack Web Developer",
        password: "parole123"
    }

    const handleChangeTheme = () => {
        console.log('Change theme');
    }

    // Delete profile modal
    const [displayModal, setDisplayModal] = useState(false);
    const handleCloseModal = () => setDisplayModal(false);

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-settings" />
            <div className="dashboard-container">
                <div className="supervisor-settings">
                    <div className="supervisor-info">
                        <img className="supervisor-profile-image" src={supervisor.gender === "male" ? male : female} alt="profile" />
                        <h1>{supervisor.name} {supervisor.surname}</h1>
                        <div className="supervisor-contact-info">
                            <h3>E-pasts: {supervisor.email}</h3>
                            <h3>Tālrunis: {supervisor.phone}</h3>
                            <h3>Uzņēmums: {supervisor.company}</h3>
                            <h3>Nozare: {supervisor.field}</h3>
                        </div>
                        <PageButton text='Rediģēt profilu' onClick={() => navigate("../supervisor-profile-edit")} />
                        <div className="supervisor-theme">
                            Mājaslapas motīvs: <span onClick={handleChangeTheme}><img src={lightMode} alt="gaišais motīvs" /> Gaišais</span>
                        </div>
                    </div>
                    <DangerButton text='Dzēst profilu' onClick={() => setDisplayModal(true)} />
                    <DeleteProfileModal role='supervisor' display={displayModal} handleClose={handleCloseModal} />
                </div>
            </div>
        </>
    );
}
 
export default SupervisorSettings;