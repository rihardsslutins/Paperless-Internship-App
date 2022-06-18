// style
import "./StudentHome.css";
// atoms
import PageButton2 from "../../../components/atoms/button/PageButton2";
// molecules
import JournalCard from "../../../components/molecules/card/JournalCard";
// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import HomeInfoProfile from "../../../components/organisms/homeInfoProfile/HomeInfoProfile";


// hooks
import { useNavigate } from "react-router-dom";
import ThemeToggleRound from "../../../components/ThemeToggle/ThemeToggleRound";

const StudentHome = () => {

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    const navigate = useNavigate();
    
    // Logged in users info
    const user = { 
        id: '6283abad20a71c3f8b4a2e07',
        name: "Ulvis",
        surname: "Čakstiņš",
        school: "Saldus tehnikums",
        phone: 25412514,
        gender: "male",
        email: "ulvisc3@gmail.com",
        password: "parole123",
        teachers: [
            {
                fullName: "Elīna Dēvita",
                email: "elinadevita@gmail.com"
            },
            {
                fullName: "Mārtiņs Zīlīte",
                email: "martins@gmail.com"
            }
        ]
    }

    // Active Journal
    const internship = [
        {
        _id: "62ab1ddbdc12beab4c30811c",
        isActive: true,
        company: "Accenture",
        supervisor: "robertstarhanovs@gmail.com",
        supervisorFullName: "Roberts Tarhanovs",
        teacher: "ivetakunkule@gmail.com",
        teacherFullName: "Iveta Kunkule",
        student: "ulvisc3@gmail.com",
        startingDate: "2022-06-22",
        journal: [
            {
                date: "2022-06-16",
                taskDescription: "Dizaina izveide",
                hoursSpent: 8,
                _id: "62ab2047c448ecf245525df1"
            },
            {
                date: "2022-06-17",
                taskDescription: "Navigācijas joslas izveide",
                hoursSpent: 8,
                _id: "62ab205fc448ecf245525df9"
            },
            {
                date: "2022-06-18",
                taskDescription: "Galvenās lapas izveide",
                hoursSpent: 8,
                _id: "62ab20a7c448ecf245525e01"
            }
        ]
        }
    ]

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-home" />
            <div className="dashboard-container">
                <div className="student-home">
                    <HomeInfoProfile user={user} role='student' /> 
                    <div className="home-student-journal-container">
                        <div className="home-student-journal">
                            <h2>Dienasgrāmata:</h2>
                            {!internship.length ?
                                <div className="student-home-no-journal">
                                    <h3>Nav aktīvas dienasgrāmatas</h3>
                                    <PageButton2 text='Izveidot dienasgrāmatu' active={''} onClick={() => navigate("../student-journal-create")} />
                                </div>
                            : 
                                <JournalCard journalCard={internship[0]} role="student"/>}
                        </div>
                    </div>
                    <ThemeToggleRound />
                </div>
            </div>
        </>
    );
}

export default StudentHome;