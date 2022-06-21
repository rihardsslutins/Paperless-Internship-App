// style
import "./TeacherStudentJournals.css";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import CardGrid from "../../../components/organisms/cardGrid/CardGrid";
// react & react-router-dom
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const TeacherStudentJournals = () => {

    const { id } = useParams();

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    const [internships, setInternships] = useState([]);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        const getStudentInternships = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships/teacher/${id}`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                console.log(response.data.internship)
                setInternships(response.data.internships)
                setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getStudentInternships()
    }, [id])

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-journal" />
            <div className="dashboard-container">
                <div className="teacher-students-journal">
                    <h1>Dienasgrāmata - {id}</h1>
                    {isPending && <div className="loading"></div>}
                    {!isPending && internships && <CardGrid internships={internships} role="teacher" />}
                </div>
            </div>
        </div>
    );
}

export default TeacherStudentJournals;