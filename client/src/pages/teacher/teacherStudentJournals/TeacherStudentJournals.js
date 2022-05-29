// style
import "./TeacherStudentJournals.css";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import CardGrid from "../../../components/organisms/cardGrid/CardGrid";

// redux
import { connect } from "react-redux";

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TeacherStudentJournals = (props) => {
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

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    // Get all journals that match users id
    const internships = [
        {
            id: '31928h312312ui3adww',
            active: true,
            companyName: 'Accenture',
            overseeingTeacher: 'Elīna Dēvita',
            mentor: 'Roberts Tarhanovs',
            date: '01.03.2022.'
        },
        {
            id: 'du12bi1v23v1y2v3i1v2',
            active: false,
            companyName: 'Brocēnu novada dome',
            overseeingTeacher: 'Elīna Dēvita',
            mentor: 'Jānis Bērziņš',
            date: '07.11.2021.'
        },
        {
            id: '31298b9be201xnxe9u2b',
            active: false,
            companyName: 'Brocēnu novada dome',
            overseeingTeacher: 'Elīna Dēvita',
            mentor: 'Jānis Bērziņš',
            date: '03.02.2021.'
        }
    ];

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-journal" />
            <div className="dashboard-container">
                <div className="teacher-students-journal">
                    <h1>Dienasgrāmata - {id}</h1>
                    <CardGrid internships={internships} role="teacher" />
                </div>
            </div>
        </div>
    );
}
 
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(TeacherStudentJournals);