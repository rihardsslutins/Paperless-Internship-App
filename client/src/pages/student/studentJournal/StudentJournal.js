// style
import './StudentJournal.css';
// atoms
import PageButton2 from '../../../components/atoms/button/PageButton2';
import DangerButton from '../../../components/atoms/button/DangerButton';
// organisms
import Sidebar from '../../../components/organisms/navbar/Sidebar';
import JournalRecordForm from '../../../components/organisms/form/JournalRecordForm';
import JournalModal from '../../../components/organisms/modal/JournalModal';
import JournalTable from '../../../components/organisms/table/JournalTable';
// packages
import axios from 'axios';
import Cookies from 'js-cookie';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Alert from '../../../components/atoms/alerts/Alert';

const StudentJournal = () => {
    const navigate = useNavigate()
    
    const { id: _id } = useParams();
    const [internship, setInternship] = useState('');
    const [journal, setJournal] = useState([]);
    const [isPending, setIsPending] = useState(false);

    // const internships = [
    //     {
    //         id: '31928h312312ui3adww',
    //         active: true,
    //         companyName: 'Accenture',
    //         mentor: 'Roberts Tarhanovs',
    //         overseeingTeacher: 'Elīna Dēvita',
    //         student: 'Ulvis Čakstiņs',
    //         date: '01.03.2022.',
    //         journal: [
    //             {
    //                 recordId: '8567ui9bcdefghjnrvmsx',
    //                 recordDate: '07.05.2022',
    //                 taskDesc: 'Izveidoju navbar',
    //                 hoursSpent: 8,
    //                 grade: 10,
    //             },
    //             {
    //                 recordId: '98icjmnu67v5dfkbghre',
    //                 recordDate: '08.05.2022',
    //                 taskDesc: 'Izveidoju sidebar',
    //                 hoursSpent: 8,
    //                 grade: 8,
    //             },
    //             {
    //                 recordId: '9bdefghjmnrv56c8i7u',
    //                 recordDate: '09.05.2022',
    //                 taskDesc: 'Stila uzlabojumi',
    //                 hoursSpent: 8,
    //                 grade: '',
    //             },
    //         ],
    //     },
    //     {
    //         id: 'du12bi1v23v1y2v3i1v2',
    //         active: false,
    //         companyName: 'Brocēnu novada dome',
    //         mentor: 'Jānis Bērziņš',
    //         overseeingTeacher: 'Elīna Dēvita',
    //         student: 'Ulvis Čakstiņs',
    //         date: '07.11.2021.',
    //         journal: [
    //             {
    //                 recordId: '679cg58idfjmruvbhnk',
    //                 recordDate: '14.02.2020',
    //                 taskDesc: 'Izveidoju reģistrācijas formu',
    //                 hoursSpent: 8,
    //                 grade: 10,
    //             },
    //             {
    //                 recordId: '95678icjmnudefghrv4',
    //                 recordDate: '15.02.2020',
    //                 taskDesc: 'Izveidoju pieslēgšanos funkcionalitāti',
    //                 hoursSpent: 8,
    //                 grade: 8,
    //             },
    //             {
    //                 recordId: 'o968iec5dfhjmnruv47bg',
    //                 recordDate: '16.02.2020',
    //                 taskDesc: 'Izveidoju studentu lapu',
    //                 hoursSpent: 8,
    //                 grade: 9,
    //             },
    //         ],
    //     },
    //     {
    //         id: '31298b9be201xnxe9u2b',
    //         active: false,
    //         companyName: 'Brocēnu novada dome',
    //         mentor: 'Jānis Bērziņš',
    //         overseeingTeacher: 'Elīna Dēvita',
    //         student: 'Ulvis Čakstiņs',
    //         date: '03.02.2021.',
    //         journal: [],
    //     },
    // ];

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    useEffect(() => {
        const getInternship = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`,
                    }
                }
                );
                console.log(response)
                setInternship(response.data)
                setJournal(response.data.journal)
                setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
            console.log('I hit')
        }
        getInternship()
    }, [_id])
    
    // Table
    const headerCells = ['Datums', 'Izpildītā darba īss raksturojums', 'Izpildes laiks', 'Vērtējums'];

    // Journal record form
    const [date, setDate] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [hoursSpent, setHoursSpent] = useState('');

    const changeDate = (e) => setDate(e.target.value);
    const changeTaskDescription = (e) => setTaskDescription(e.target.value);
    const changeHoursSpent = (e) => setHoursSpent(e.target.value);

    const onChangeArray = [changeDate, changeTaskDescription, changeHoursSpent];
    const formLabels = ['Datums:', 'Izpildītā darba īss raksturojums:', 'Izpildes laiks:'];
    const formNames = ['date', 'taskDesc', 'time'];
    const formTypes = ['date', 'text', 'number'];
    const formValues = [date, taskDescription, hoursSpent];

    // Alert
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');
    const handleAlertClose = () => {
        setAlert('');
        setAlertType('');
    };

    const handleAddJournalRecord = async (e) => {
        e.preventDefault();
        try {
            // if (!date) {
            //     setAlert('Lūdzu ievadiet datumu!')
            //     setAlertType('warning')
            // } else if (!taskDescription) {
            //     setAlert('Lūdzu ievadiet izpildītā darba raksturojumu!')
            //     setAlertType('warning')
            // } else if (!hoursSpent) {
            //     setAlert('Lūdzu ievadiet izpildes laiku!')
            //     setAlertType('warning')
            // } else {
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/journals`,
                { 
                    _id, 
                    date, 
                    taskDescription, 
                    hoursSpent 
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`,
                    }
                })
                setAlertType('success')
                setAlert('Ieraksts tika pievienots dienasgrāmatai!')
                setDate('');
                setTaskDescription('');
                setHoursSpent('');
        } catch (err) {
            console.log(err.response.data.errors)
        }
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
                {isPending && <div className="loading"></div>}
                {!isPending &&
                    <>
                        {internship._id && (
                            <div className="student-journal">
                                <div className="student-journal-header">
                                    <PageButton2
                                        text="Atpakaļ"
                                        active=""
                                        onClick={() => navigate("../student-journals")}
                                    />
                                    <h1>{internship.company}</h1>
                                    {internship.isActive && (
                                        <DangerButton
                                            text="Noslēgt praksi"
                                            onClick={() => setDisplayModal(true)}
                                        />
                                    )}
                                    <div className="student-journal-info">
                                        <p>Prakses vadītājs: {internship.supervisor}</p>
                                        <p>Skolotāja: {internship.teacher}</p>
                                        <p>Praktikants: {internship.student}</p>
                                    </div>
                                </div>
                                <JournalTable headerCells={headerCells} data={journal} />
                                {alert &&
                                    <Alert
                                        type={alertType}
                                        text={alert}
                                        handleAlertClose={handleAlertClose}
                                    />
                                }
                                {internship.isActive && (
                                    <JournalRecordForm
                                        id={formNames}
                                        name={formNames}
                                        label={formLabels}
                                        type={formTypes}
                                        value={formValues}
                                        onClick={handleAddJournalRecord}
                                        onChange={onChangeArray}
                                        buttonText="Pievienot"
                                    />
                                )}
                                {internship.isActive && (
                                    <JournalModal
                                        companyName={internship.company}
                                        display={displayModal}
                                        handleClose={handleClose}
                                    />
                                )}
                            </div>
                        )}
                        {!internship._id && <h2>Šāda dienasgrāmata nepastāv</h2>}
                    </>
                }
            </div>
        </>
    );
};

export default StudentJournal;
