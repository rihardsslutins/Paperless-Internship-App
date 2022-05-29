// style
import './StudentJournal.css';

// redux
import { connect } from 'react-redux';

// atoms
import PageButton2 from '../../../components/atoms/button/PageButton2';
import DangerButton from '../../../components/atoms/button/DangerButton';
// organisms
import Sidebar from '../../../components/organisms/navbar/Sidebar';
import JournalRecordForm from '../../../components/organisms/form/JournalRecordFrom';
import JournalModal from '../../../components/organisms/modal/JournalModal';
import Table from '../../../components/organisms/table/Table';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StudentJournal = (props) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!props.user.role) {
            navigate(`../login`)
        }
        if (!props.user.role === 'student') {
            navigate(`../${props.user.role}-home`)
        }
    })
    const { id } = useParams();
    const [journalInfo, setJournalInfo] = useState([]);
    const [journal, setJournal] = useState([]);

    const internships = [
        {
            id: '31928h312312ui3adww',
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
                    grade: 10,
                },
                {
                    recordId: '98icjmnu67v5dfkbghre',
                    recordDate: '08.05.2022',
                    taskDesc: 'Izveidoju sidebar',
                    hoursSpent: 8,
                    grade: 8,
                },
                {
                    recordId: '9bdefghjmnrv56c8i7u',
                    recordDate: '09.05.2022',
                    taskDesc: 'Stila uzlabojumi',
                    hoursSpent: 8,
                    grade: '',
                },
            ],
        },
        {
            id: 'du12bi1v23v1y2v3i1v2',
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
                    grade: 10,
                },
                {
                    recordDate: '15.02.2020',
                    taskDesc: 'Izveidoju pieslēgšanos funkcionalitāti',
                    hoursSpent: 8,
                    grade: 8,
                },
                {
                    recordDate: '16.02.2020',
                    taskDesc: 'Izveidoju studentu lapu',
                    hoursSpent: 8,
                    grade: 9,
                },
            ],
        },
        {
            id: '31298b9be201xnxe9u2b',
            active: false,
            companyName: 'Brocēnu novada dome',
            mentor: 'Jānis Bērziņš',
            overseeingTeacher: 'Elīna Dēvita',
            student: 'Ulvis Čakstiņs',
            date: '03.02.2021.',
            journal: [],
        },
    ];

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = [
        'home page',
        'journal page',
        'mail page',
        'settings page',
        'help page',
    ];
    const title = [
        'Sākums',
        'Dienasgrāmata',
        'Vēstules',
        'Iestatījumi',
        'Palīdzība',
    ];
    const link = [
        'student-home',
        'student-journals',
        'student-mail',
        'student-settings',
        'help',
    ];

    // Display record where journal id matches id param
    useEffect(() => {
        internships.forEach((internship) => {
            if (internship.id === id) {
                setJournalInfo(internship);
                setJournal(internship.journal);
            }
        });
    }, [id]);

    // Table
    const headerCells = [
        'Datums',
        'Izpildītā darba īss raksturojums',
        'Izpildes laiks',
        'Vērtējums',
    ];

    // Journal record form
    const [date, setDate] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [hoursSpent, setHoursSpent] = useState('');

    const changeDate = (e) => setDate(e.target.value);
    const changeTaskDesc = (e) => setTaskDesc(e.target.value);
    const changeHoursSpent = (e) => setHoursSpent(e.target.value);

    const onChangeArray = [changeDate, changeTaskDesc, changeHoursSpent];
    const formLabels = [
        'Datums:',
        'Izpildītā darba īss raksturojums:',
        'Izpildes laiks:',
    ];
    const formNames = ['date', 'taskDesc', 'time'];
    const formTypes = ['date', 'text', 'number'];

    const handleAddRecord = (e) => {
        e.preventDefault();
        console.log(date, taskDesc, hoursSpent);
    };

    // Journal modal
    const [displayModal, setDisplayModal] = useState(false);
    const handleClose = () => setDisplayModal(false);

    return (
        <>
            <Sidebar
                icon={icon}
                imgAlt={imgAlt}
                title={title}
                link={link}
                page="student-journals"
            />
            <div className="dashboard-container">
                {journalInfo.id && (
                    <div className="student-journal">
                        <div className="student-journal-header">
                            <PageButton2
                                text="Atpakaļ"
                                active=""
                                onClick={() => navigate(-1)}
                            />
                            <h1>{journalInfo.companyName}</h1>
                            {journalInfo.active && (
                                <DangerButton
                                    text="Noslēgt praksi"
                                    onClick={() => setDisplayModal(true)}
                                />
                            )}
                            <div className="student-journal-info">
                                <p>Prakses vadītājs: {journalInfo.mentor}</p>
                                <p>
                                    Skolotāja: {journalInfo.overseeingTeacher}
                                </p>
                                <p>Praktikants: {journalInfo.student}</p>
                            </div>
                        </div>
                        <Table headerCells={headerCells} data={journal} />
                        {journalInfo.active && (
                            <JournalRecordForm
                                id={formNames}
                                name={formNames}
                                label={formLabels}
                                type={formTypes}
                                onClick={handleAddRecord}
                                onChange={onChangeArray}
                                buttonText="Pievienot"
                            />
                        )}
                        {journalInfo.active && (
                            <JournalModal
                                companyName={journalInfo.companyName}
                                display={displayModal}
                                handleClose={handleClose}
                            />
                        )}
                    </div>
                )}
                {!journalInfo.id && <h2>Šāda dienasgrāmata nepastāv</h2>}
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(StudentJournal);
