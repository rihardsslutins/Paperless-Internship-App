// style
import "./StudentJournalCreate.css";
// atoms
import Alert from "../../../components/atoms/alerts/Alert";
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


const StudentJournalCreate = (props) => {

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
    const changeTeacherEmail = e => setTeacherEmail(e.target.value);
    const changeSupervisorEmail = e => setSupervisorEmail(e.target.value);
    const changeStartingDate = e => setStartingDate(e.target.value);

    const onChangeArray = [changeCompany, changeTeacherEmail, changeSupervisorEmail, changeStartingDate];

    const formLabels = ['Uzņēmuma nosaukums:', 'Prakses vadītājs (skola):', 'Prakses vadītājs (uzņēmums):', 'Prakses sākums:'];
    const formNames = ['company', 'teacher', 'supervisor', 'startingDate'];
    const formTypes = ['text', 'email', 'email', 'date'];
    const formPlaceholders = ['', 'E-pasts', 'E-pasts', ''];

    // Alert
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('')
    const handleAlertClose = () => {
        setAlert('');
    };

    const handleCreateJournal = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/internship`,
            {
                company,
                studentEmail: props.user.email,
                teacherEmail,
                supervisorEmail,
                startingDate
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                },
            }
            )
            setAlertType('success')
            setAlert('Dienasgrāmata ir izveidota!')
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['company', 'studentEmail', 'teacherEmail', 'supervisorEmail', 'startingDate']
            handleErrors(errors, propertyOrder)
            setAlertType('warning')
            console.log(errors)
        }
        // e.preventDefault();
        // if (companyName.length && overseeingTeacher.length && mentor.length && startDate.length) {
        //     console.log(companyName, overseeingTeacher, mentor, startDate);
        //     setAlert('');
        // } else {
        //     setAlert('Aizpildiet visus laukus!');
        // }
    }

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-journals" />
            <div className="dashboard-container">
                <div className="student-journal-create">
                    <h1>Dienasgrāmatas izveide</h1>
                    {alert && 
                        <Alert 
                            type={alertType}
                            text={alert}
                            handleAlertClose={handleAlertClose}
                        />
                    }
                    <JournalForm
                        id={formNames}
                        name={formNames}
                        label={formLabels}
                        type={formTypes}
                        placeholder={formPlaceholders}
                        onClick={handleCreateJournal}
                        onChange={onChangeArray}
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
