// style
import "./StudentSettings.css";
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

const StudentSettings = () => {

    const navigate = useNavigate();

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    // Logged in users info
    const student = { 
        id: '6283abad20a71c3f8b4a2e07',
        name: "Ulvis",
        surname: "Čakstiņš",
        school: "Saldus thenikums",
        phone: 25412514,
        gender: "male",
        email: "ulvisc3@gmail.com",
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
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-settings" />
            <div className="dashboard-container">
                <div className="student-settings">
                    <div className="student-info">
                        <img className="student-profile-image" src={student.gender === "male" ? male : female} alt="profile" />
                        <h1>{student.name} {student.surname}</h1>
                        <div className="student-contact-info">
                            <h3>E-pasts: {student.email}</h3>
                            <h3>Tālrunis: {student.phone}</h3>
                            <h3>Skola: {student.school}</h3>
                        </div>
                        <PageButton text='Rediģēt profilu' onClick={() => navigate("../student-profile-edit")} />
                        <div className="student-theme">
                            Mājaslapas motīvs: <span onClick={handleChangeTheme}><img src={lightMode} alt="gaišais motīvs" /> Gaišais</span>
                        </div>
                    </div>
                    <DangerButton text='Dzēst profilu' onClick={() => setDisplayModal(true)} />
                    <DeleteProfileModal role='student' display={displayModal} handleClose={handleCloseModal} />
                </div>
            </div>
        </>
    );
}
 
export default StudentSettings;