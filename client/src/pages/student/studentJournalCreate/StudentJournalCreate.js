// style
import "./StudentJournalCreate.css";
// atoms
import Alert from "../../../components/atoms/alerts/Alert";
import PageButton2 from "../../../components/atoms/button/PageButton2";
// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import JournalForm from "../../../components/organisms/form/JournalForm";
// packages
import Cookies from "js-cookie";
import axios from "axios";
// redux
import { connect } from "react-redux";
// hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const StudentJournalCreate = (props) => {

    const navigate = useNavigate();

    const handleErrors = (errors, propertyOrder) => {
        for (let i = 0; i < propertyOrder.length; i++) {
            if (errors[propertyOrder[i]]) {
                setAlert(errors[propertyOrder[i]]);
                return;
            } else {
                setAlert('');
            }
        }
    };

    // SIDEBAR
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    // INPUTS
    const [company, setCompany] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [supervisorEmail, setSupervisorEmail] = useState('');
    const [startingDate, setStartingDate] = useState('');

    const changeCompany = e => setCompany(e.target.value);
    const changeSupervisorEmail = e => setSupervisorEmail(e.target.value);
    const changeStartingDate = e => setStartingDate(e.target.value);

    const onChangeArray = [changeCompany, '', changeSupervisorEmail, changeStartingDate];

    // Logged in users info
    const student = { 
        id: '6283abad20a71c3f8b4a2e07',
        name: "Ulvis",
        surname: "Čakstiņš",
        school: "Saldus thenikums",
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

    const formLabels = ['Uzņēmuma nosaukums:', '', 'Prakses vadītājs (uzņēmums):', 'Prakses sākums:'];
    const formNames = ['company', 'teacher', 'supervisor', 'startingDate'];
    const formTypes = ['text', '', 'email', 'date'];
    const formPlaceholders = ['', '', 'E-pasts', ''];
    const formValues = [company, teacherEmail, supervisorEmail, startingDate];
    const defaultFormOption = 'Izvēlieties skolotāju';
    let formOptions = [['', 'Izvēlieties skolotāju']];
    if (student.teachers.length) {
        for (let i = 0; i < student.teachers.length; i++) {
            formOptions.push([student.teachers[i].email, student.teachers[i].fullName])
        }
    } else {
        formOptions = [['', 'Pievienojiet skolotāju iestatījumu lapā']]
    }

    // Alert
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertLink, setAlertLink] = useState([]);
    const handleAlertClose = () => {
        setAlert('');
        setAlertType('');
    };

    const handleCreateJournal = async (e) => {
        e.preventDefault()
        try {
            if (!company) {
                setAlert('Lūdzu ievadi uzņēmuma nosaukumu!')
                setAlertType('warning')
            } else if (!teacherEmail) {
                setAlert('Lūdzu ievadi prakses vadītāja (no skolas) epastu!')
                setAlertType('warning')
            } else if (!supervisorEmail) {
                setAlert('Lūdzu ievadi prakses vadītāja (no uzņēmuma) epastu!')
                setAlertType('warning')
            } else if (!startingDate) {
                setAlert('Lūdzu ievadi prakses sākuma datumu!')
                setAlertType('warning')
            }  else {
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/internships`,
                {
                    company,
                    student: props.user.email,
                    teacher: teacherEmail,
                    supervisor: supervisorEmail,
                    startingDate
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`,
                    },
                }
                )
                setAlertType('success');
                setAlert('Dienasgrāmata ir izveidota!');
                setAlertLink(['Doties uz dienasgrāmatu', '/student-journals']);
                setCompany('');
                setTeacherEmail('');
                setSupervisorEmail('');
                setStartingDate('');
            }
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['company', 'student', 'teacher', 'supervisor', 'startingDate']
            handleErrors(errors, propertyOrder)
            setAlertType('warning')
        }
    }

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-journals" />
            <div className="dashboard-container">
                <div className="student-journal-create">
                    <div className="student-create-journal-header">
                        <PageButton2
                            text="Atpakaļ"
                            active=""
                            onClick={() => navigate("../student-journals")}
                        />
                        <h1>Dienasgrāmatas izveide</h1>
                    </div>
                    {alert && 
                        <Alert 
                            type={alertType}
                            text={alert}
                            link={alertLink}
                            handleAlertClose={handleAlertClose}
                        />
                    }
                    <JournalForm
                        id={formNames}
                        name={formNames}
                        label={formLabels}
                        type={formTypes}
                        value={formValues}
                        placeholder={formPlaceholders}
                        onClick={handleCreateJournal}
                        onChange={onChangeArray}
                        options={formOptions}
                        defaultFormOption={defaultFormOption}
                        setChosen={setTeacherEmail}
                        buttonText="Izveidot"
                    />  
                </div>
            </div>
        </>
    );
}
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(StudentJournalCreate);
