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

    const [internship, setInternship] = useState([]);
    const [refreshTable, setRefreshTable] = useState(true);
    const [isPending, setIsPending] = useState(false);

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

    // Alert
    const [alert, setAlert] = useState('');
    const [alertType, setAlertType] = useState('');
    const handleAlertClose = () => {
        setAlert('');
        setAlertType('');
    };

    useEffect(() => {
        const getStudentInternship = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                }
                );
            setInternship(response.data.internship);
            setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getStudentInternship()
    }, [refreshTable, id])
    
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

    const handleAddGrade = async (e) => {
        e.preventDefault();
        setAlertType('');
        setAlert('');
        try {
            console.log(`${editRecord[0]}`)
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/journals/${editRecord[0]}`,
            { 
                id,
                grade 
            }, 
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            })
            setAlertType('success');
            setAlert('Atzīme tika ielikta ' + editRecord[1] + ' ierakstam!');
            setRefreshTable(false);
            setRefreshTable(true);
            setEditRecord();
            setGrade('');
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['grade'];
            handleErrors(errors, propertyOrder);
        }
    }
    const handleReset = () => {
        setEditRecord();
        setGrade('');
        handleAlertClose();
    }

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-journal" />
            <div className="dashboard-container">
                {isPending && <div className="loading"></div>}
                {!isPending &&
                    <>
                        {internship._id && (
                            <div className="supervisor-student-journal">
                                <div className="supervisor-student-journal-header">
                                    <PageButton2 text="Atpakaļ" active="" onClick={() => navigate("../supervisor-journal")} />
                                    <h1>{internship.company}</h1>
                                    <div className="supervisor-student-journal-info">
                                        <p>Prakses vadītājs: {internship.supervisorFullName}</p>
                                        <p>Skolotāja: {internship.teacherFullName}</p>
                                        <p>Praktikants: {internship.studentFullName}</p>
                                    </div>
                                </div>
                                <JournalTable headerCells={headerCells} data={internship.journal} setEditRecord={setEditRecord} setAlert={setAlert} />
                                {alert && <Alert text={alert} type={alertType} handleAlertClose={handleAlertClose} />}
                                {editRecord && 
                                    <div className="supervisor-journal-form">
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
                                    </div>
                                }
                            </div>
                        )}
                        {!internship._id && <h2>Šāda dienasgrāmata nepastāv</h2>}
                    </>
                }
            </div>
        </div>
    );
}

export default SupervisorStudentJournal;