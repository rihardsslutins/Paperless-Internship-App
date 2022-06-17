// style
import "./StudentSettings.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
// atoms
import DangerButton from "../../../components/atoms/button/DangerButton";
import PageButton from "../../../components/atoms/button/PageButton";
import Alert from "../../../components/atoms/alerts/Alert";
// molecules
import InputButtonGroup from "../../../components/molecules/labeledInput/InputButtonGroup";
// components
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import DeleteProfileModal from "../../../components/organisms/modal/DeleteProfileModal";
import ThemeToggle from "../../../components/ThemeToggle/ThemeToggle";
// redux
import { connect } from "react-redux";
// hooks
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const StudentSettings = (props) => {
    
    const student = props.user

    const navigate = useNavigate();

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    // // Logged in users info
    // const student = { 
    //     id: '6283abad20a71c3f8b4a2e07',
    //     name: "Ulvis",
    //     surname: "Čakstiņš",
    //     school: "Saldus thenikums",
    //     phone: 25412514,
    //     gender: "male",
    //     email: "ulvisc3@gmail.com",
    //     password: "parole123",
    //     teachers: [
    //         {
    //             fullName: "Elīna Dēvita",
    //             email: "elinadevita@gmail.com"
    //         },
    //         {
    //             fullName: "Mārtiņs Zīlīte",
    //             email: "martins@gmail.com"
    //         }
    //     ]
    // }

    // Add teacher
    const [teacherEmail, setTeacherEmail] = useState('');
    const handleAddTeacher = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/invites`, {
                sender: student.email,
                receiver: teacherEmail
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            })
        } catch (err) {
            console.log(err.response.data.errors)
        }
        // if (!teacherEmail) {
        //     setAlertType('warning');
        //     setAlert('Ievadiet skolotāja e-pastu!');
        // } else {
        //     setAlertType('success');
        //     setAlert('Skolotājas pievienošanas uzaicinājums tika nosūtīts!');
        //     console.log(teacherEmail);
        // }
    }

    const [pendingTeachers, setPendingTeachers] = useState([])
    
    useEffect(() => {
        const getPendingTeachers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/invites/teachers`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setPendingTeachers(response.data.invites)
            } catch (err) {
                console.log(err)
            }
        }
        getPendingTeachers()
    })
    // Alerts
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');
    const handleAlertClose = () => {
        setAlert('');
        setAlertType('');
    };

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
                            Mājaslapas motīvs: <ThemeToggle />
                        </div>
                        <div className="student-teachers">
                            <h3>Skolotāji</h3>
                            <div className="student-teachers-grid">
                                {student.teachers ?
                                        student.teachers.map((teacher) => (
                                            <p>{teacher.fullName}</p>
                                        ))
                                    :
                                        <p>Nav pievienots neviens skolotājs</p>
                                }
                                {pendingTeachers.length ?
                                        pendingTeachers.map((teacher) => (
                                            <p style={{color: 'gray'}}>{teacher.receiverFullName}</p>
                                        ))
                                    :
                                        null
                                }
                            </div>
                            <div className="add-teacher">
                                {alert && 
                                    <Alert 
                                        type={alertType}
                                        text={alert}
                                        handleAlertClose={handleAlertClose}
                                    />
                                }
                                <InputButtonGroup 
                                    type='email'
                                    onChange={(e) => setTeacherEmail(e.target.value)}
                                    name='teacherEmail'
                                    placeholder='Skolotāja e-pasts'
                                    text='Pievienot'
                                    onClick={handleAddTeacher}
                                />
                            </div>
                        </div>
                    </div>
                    <DangerButton text='Dzēst profilu' onClick={() => setDisplayModal(true)} />
                    <DeleteProfileModal role='student' display={displayModal} handleClose={handleCloseModal} />
                </div>
            </div>
        </>
    );
}
 
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(StudentSettings);