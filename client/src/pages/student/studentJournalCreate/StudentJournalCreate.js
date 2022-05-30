// style
import "./StudentJournalCreate.css";
// atoms
import Alert from "../../../components/atoms/alerts/Alert";
// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import JournalForm from "../../../components/organisms/form/JournalForm";
// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// redux
import { connect } from "react-redux";

const StudentJournalCreate = (props) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!props.user.role) {
            navigate(`../login`)
        }
        if (!props.user.role === 'student') {
            navigate(`../${props.user.role}-home`)
        }
    })
    
    
    // SIDEBAR
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    // INPUTS
    const [companyName, setCompnayName] = useState('');
    const [overseeingTeacher, setOverseeingTeacher] = useState('');
    const [mentor, setMentor] = useState('');
    const [startDate, setStartDate] = useState('');

    const changeCompanyName = e => setCompnayName(e.target.value);
    const changeOverseeingTeacher = e => setOverseeingTeacher(e.target.value);
    const changeMentor = e => setMentor(e.target.value);
    const changeStartDate = e => setStartDate(e.target.value);

    const onChangeArray = [changeCompanyName, changeOverseeingTeacher, changeMentor, changeStartDate];

    const formLabels = ['Uzņēmuma nosaukums:', 'Prakses vadītājs (skola):', 'Prakses vadītājs (uzņēmums):', 'Prakses sākums:'];
    const formNames = ['companyName', 'overseeingTeacher', 'mentor', 'startDate'];
    const formTypes = ['text', 'email', 'email', 'date'];
    const formPlaceholders = ['', 'E-pasts', 'E-pasts', ''];

    const handleCreateJournal = (e) => {
        e.preventDefault();
        if (companyName.length && overseeingTeacher.length && mentor.length && startDate.length) {
            console.log(companyName, overseeingTeacher, mentor, startDate);
            setAlert('');
        } else {
            setAlert('Aizpildiet visus laukus!');
        }
    }

    // Alert
    const [alert, setAlert] = useState('');
    const handleAlertClose = () => {
        setAlert('');
    };

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-journals" />
            <div className="dashboard-container">
                <div className="student-journal-create">
                    <h1>Dienasgrāmatas izveide</h1>
                    {alert && 
                        <Alert 
                            type='warning'
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
 
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(StudentJournalCreate);