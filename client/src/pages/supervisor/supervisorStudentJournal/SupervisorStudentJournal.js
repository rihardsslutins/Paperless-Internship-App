// style
import "./SupervisorStudentJournal.css";
// atoms
import PageButton2 from "../../../components/atoms/button/PageButton2";
import PageButton from "../../../components/atoms/button/PageButton";
import DangerButton2 from "../../../components/atoms/button/DangerButton2";
import Alert from "../../../components/atoms/alerts/Alert";
// molecules
import InputGroup from "../../../components/molecules/labeledInput/InputGroup";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import JournalTable from "../../../components/organisms/table/JournalTable";
// react & react router dom
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// packages
import axios from 'axios';
import Cookies from "js-cookie";

const SupervisorStudentJournal = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [internship, setInternship] = useState([])

    useEffect(() => {
        const getStudentInternship = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            })
            setInternship(response.data.internship)
        }
        getStudentInternship()
    }, [])

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

    // Table
    const headerCells = ['Datums', 'Izpildītā darba īss raksturojums', 'Izpildes laiks', 'Vērtējums'];

    // Add grade
    const [editRecord, setEditRecord] = useState();
    const [grade, setGrade] = useState('');
    const [alert, setAlert] = useState('');
    
    const handleAddGrade = async () => {
        // if (grade.length) {
        //     console.log(`Ieraksta id: ${editRecord[0]}, datums: ${editRecord[1]}, atzīme: ${grade}`);
        //     setEditRecord();
        //     setGrade('');
        //     setAlert('');
        // } else {
        //     setAlert('Atzīmes lauks nav aizpildīts');
        // }
        // console.log(Cookies.get('auth'))
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/journals/${editRecord[0]}`, { id, grade }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            })
        } catch (err) {
            console.log(err.response.data.errors)
        }

    }
    const handleReset = () => {
        setEditRecord();
        setGrade('');
        handleAlertClose();
    }
    const handleAlertClose = () => {
        setAlert('');
    };
    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-journal" />
            <div className="dashboard-container">
                {internship._id && <div className="supervisor-student-journal">
                    <div className="supervisor-student-journal-header">
                        <PageButton2 text="Atpakaļ" active="" onClick={() => navigate(-1)} />
                        <h1>{internship.company}</h1>
                        <div className="supervisor-student-journal-info">
                            <p>Prakses vadītājs: {internship.supervisorFullName}</p>
                            <p>Skolotāja: {internship.teacherFullName}</p>
                            <p>Praktikants: {internship.studentFullName}</p>
                        </div>
                    </div>
                    <JournalTable headerCells={headerCells} data={internship.journal} setEditRecord={setEditRecord} />
                    {editRecord && <div className="supervisor-journal-form">
                        {alert && <Alert text={alert} type='warning' handleAlertClose={handleAlertClose} />}
                        <InputGroup 
                            onChange={e => setGrade(e.target.value)}
                            type='number'
                            name='grade'
                            label={`Atzīme ${editRecord[1]} ierakstam:`}
                            placeholder={editRecord[2] ? `Pašreizējā atzīme ${editRecord[2]}` : ''}
                        />
                        <div className="supervisor-journal-form-buttons">
                            <DangerButton2 
                                text='Atcelt' 
                                onClick={handleReset} 
                            />
                            <PageButton 
                                onClick={handleAddGrade}
                                text='Ielikt atzīmi'
                            />
                        </div>
                    </div>}
                </div>}
                {!internship._id &&
                    <h2>Šāda dienasgrāmata nepastāv</h2>
                }
            </div>
        </div>
    );
}

export default SupervisorStudentJournal;