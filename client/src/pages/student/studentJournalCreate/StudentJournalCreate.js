// style
import "./StudentJournalCreate.css";

// redux
import { connect } from "react-redux";

// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import JournalForm from "../../../components/organisms/form/JournalForm";
// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

    const changeCompanyName = (e) => setCompnayName(e.target.value);
    const changeOverseeingTeacher = (e) => setOverseeingTeacher(e.target.value);
    const changeMentor = (e) => setMentor(e.target.value);

    const onChangeArray = [changeCompanyName, changeOverseeingTeacher, changeMentor];

    const formLabels = ['Uzņēmuma nosaukums:', 'Prakses vadītājs (skola):', 'Prakses vadītājs (uzņēmums):'];
    const formNames = ['companyName', 'overseeingTeacher', 'mentor'];
    const formTypes = ['text', 'email', 'email'];

    const handleCreateJournal = (e) => {
        e.preventDefault();
        console.log(companyName, overseeingTeacher, mentor);
    }

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-journals" />
            <div className="dashboard-container">
                <div className="student-journal-create">
                    <h1>Dienasgrāmatas izveide</h1>
                    <JournalForm
                        id={formNames}
                        name={formNames}
                        label={formLabels}
                        type={formTypes}
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