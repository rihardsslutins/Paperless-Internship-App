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
import Table from "../../../components/organisms/table/Table";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SupervisorStudentJournal = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [journalInfo, setJournalInfo] = useState([]);
    const [journal, setJournal] = useState([]);

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

    // All users internships
    const internships = [
        {
            journalId: '31928h312312ui3adww',
            active: true,
            companyName: 'Accenture',
            mentor: 'Roberts Tarhanovs',
            overseeingTeacher: 'Elīna Dēvita',
            student: 'Ulvis Čakstiņs',
            date: '01.03.2022.',
            journal: [
                {
                    recordId: '8567ui9bcdefghjnrvmsx',
                    recordDate: '07.05.2022',
                    taskDesc: 'Izveidoju navbar',
                    hoursSpent: 8,
                    grade: 10
                },
                {
                    recordId: '98icjmnu67v5dfkbghre',
                    recordDate: '08.05.2022',
                    taskDesc: 'Izveidoju sidebar',
                    hoursSpent: 8,
                    grade: 8
                },
                {
                    recordId: '9bdefghjmnrv56c8i7u',
                    recordDate: '09.05.2022',
                    taskDesc: 'Stila uzlabojumi',
                    hoursSpent: 8,
                    grade: ''
                }
            ]
        }
    ]

    // Table
    const headerCells = ['Datums', 'Izpildītā darba īss raksturojums', 'Izpildes laiks', 'Vērtējums'];

    // Display record where journal id matches id param
    useEffect(() => {
        internships.forEach(internship => {
            if (internship.journalId === id) {
                setJournalInfo(internship);
                setJournal(internship.journal);
            }
        });
    }, [id]);

    // Add grade
    const [editRcord, setEditRecord] = useState();
    const [grade, setGrade] = useState('');
    const [alert, setAlert] = useState('');
    
    const handleAddGrade = () => {
        if (grade.length) {
            console.log(`Ieraksta id: ${editRcord[0]}, datums: ${editRcord[1]}, atzīme: ${grade}`);
            setEditRecord();
            setGrade('');
            setAlert('');
        } else {
            setAlert('Atzīmes lauks nav aizpildīts');
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
                {journalInfo.journalId && <div className="supervisor-student-journal">
                    <div className="supervisor-student-journal-header">
                        <PageButton2 text="Atpakaļ" active="" onClick={() => navigate(-1)} />
                        <h1>{journalInfo.companyName}</h1>
                        <div className="supervisor-student-journal-info">
                            <p>Prakses vadītājs: {journalInfo.mentor}</p>
                            <p>Skolotāja: {journalInfo.overseeingTeacher}</p>
                            <p>Praktikants: {journalInfo.student}</p>
                        </div>
                    </div>
                    <Table headerCells={headerCells} data={journal} setEditRecord={setEditRecord} />
                    {editRcord && <div className="supervisor-journal-form">
                        {alert && <Alert text={alert} type='warning' handleAlertClose={handleAlertClose} />}
                        <InputGroup 
                            onChange={e => setGrade(e.target.value)}
                            type='number'
                            name='grade'
                            label={`Atzīme ${editRcord[1]} ierakstam:`}
                            placeholder={editRcord[2] ? `Pašreizējā atzīme ${editRcord[2]}` : ''}
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
                {!journalInfo.journalId &&
                    <h2>Šāda dienasgrāmata nepastāv</h2>
                }
            </div>
        </div>
    );
}

export default SupervisorStudentJournal;