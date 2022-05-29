// style
import "./TeacherStudentJournal.css";
// atoms
import PageButton2 from "../../../components/atoms/button/PageButton2";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import Table from "../../../components/organisms/table/Table";

// redux
import { connect } from "react-redux";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TeacherStudentJournal = (props) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!props.user.role) {
            navigate(`../login`)
        }
        if (!props.user.role === 'teacher') {
            navigate(`../${props.user.role}-home`)
        }
    })

    const { id } = useParams();
    const [journalInfo, setJournalInfo] = useState([]);
    const [journal, setJournal] = useState([]);

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

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
        },
        {
            journalId: 'du12bi1v23v1y2v3i1v2',
            active: false,
            companyName: 'Brocēnu novada dome',
            mentor: 'Jānis Bērziņš',
            overseeingTeacher: 'Elīna Dēvita',
            student: 'Ulvis Čakstiņs',
            date: '07.11.2021.',
            journal: [
                {
                    recordDate: '14.02.2020',
                    taskDesc: 'Izveidoju reģistrācijas formu',
                    hoursSpent: 8,
                    grade: 10
                },
                {
                    recordDate: '15.02.2020',
                    taskDesc: 'Izveidoju pieslēgšanos funkcionalitāti',
                    hoursSpent: 8,
                    grade: 8
                },
                {
                    recordDate: '16.02.2020',
                    taskDesc: 'Izveidoju studentu lapu',
                    hoursSpent: 8,
                    grade: 9
                }
            ]
        },
        {
            journalId: '31298b9be201xnxe9u2b',
            active: false,
            companyName: 'Brocēnu novada dome',
            mentor: 'Jānis Bērziņš',
            overseeingTeacher: 'Elīna Dēvita',
            student: 'Ulvis Čakstiņs',
            date: '03.02.2021.',
            journal: [
            ]
        }
    ];

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


    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-journal" />
            <div className="dashboard-container">
                {journalInfo.journalId && <div className="teacher-student-journal">
                    <div className="teacher-student-journal-header">
                        <PageButton2 text="Atpakaļ" active="" onClick={() => navigate(-1)} />
                        <h1>{journalInfo.companyName}</h1>
                        <div className="teacher-student-journal-info">
                            <p>Prakses vadītājs: {journalInfo.mentor}</p>
                            <p>Skolotāja: {journalInfo.overseeingTeacher}</p>
                            <p>Praktikants: {journalInfo.student}</p>
                        </div>
                    </div>
                    <Table headerCells={headerCells} data={journal} />
                </div>}
                {!journalInfo.journalId &&
                    <h2>Šāda dienasgrāmata nepastāv</h2>
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(TeacherStudentJournal);