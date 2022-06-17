// style
import "./TeacherStudentJournal.css";
// atoms
import PageButton2 from "../../../components/atoms/button/PageButton2";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import JournalTable from "../../../components/organisms/table/JournalTable";
// react & react-router-dom
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// packages
import axios from 'axios';
import Cookies from "js-cookie";

const TeacherStudentJournal = () => {
    const navigate = useNavigate()

    const { id } = useParams();
    
    const [internship, setInternship] = useState([])
    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    useEffect(() => {
        const getInternship = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            }
            )
            setInternship(response.data.internship)
        }
        getInternship()
    }, [id])

    // Table
    const headerCells = ['Datums', 'Izpildītā darba īss raksturojums', 'Izpildes laiks', 'Vērtējums'];


    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-journal" />
            <div className="dashboard-container">
                {internship._id && <div className="teacher-student-journal">
                    <div className="teacher-student-journal-header">
                        <PageButton2 text="Atpakaļ" active="" onClick={() => navigate(-1)} />
                        <h1>{internship.company}</h1>
                        <div className="teacher-student-journal-info">
                            <p>Prakses vadītājs: {internship.supervisorFullName}</p>
                            <p>Skolotāja: {internship.teacherFullName}</p>
                            <p>Praktikants: {internship.studentFullName}</p>
                        </div>
                    </div>
                    <JournalTable headerCells={headerCells} data={internship.journal} />
                </div>}
                {!internship._id &&
                    <h2>Šāda dienasgrāmata nepastāv</h2>
                }
            </div>
        </div>
    );
}

export default TeacherStudentJournal;