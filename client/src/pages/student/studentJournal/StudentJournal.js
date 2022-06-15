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
                setInternship(response.data)
                setJournal(response.data.journal)
                setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
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

    // Error handling
    const handleErrors = (errors, propertyOrder) => {
        for (let i = 0; i < propertyOrder.length; i++) {
            if (errors[propertyOrder[i]]) {
                setAlertType('warning');
                setAlert(errors[propertyOrder[i]]);
                return;
            } else {
                setAlertType('');
                setAlert('');
            }
        }
    };

    // Add record to journal
    const handleAddJournalRecord = async (e) => {
        e.preventDefault();
        setAlertType('');
        setAlert('');
        try {
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
            const errors = err.response.data.errors;
            const propertyOrder = ['date', 'taskDescription', 'hoursSpent'];
            handleErrors(errors, propertyOrder);
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
