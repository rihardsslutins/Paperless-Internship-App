// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";

// redux
import { connect } from "react-redux";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherHome = (props) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!props.user.role) {
            navigate(`../login`)
        }
        if (!props.user.role === 'teacher') {
            navigate(`../${props.user.role}-home`)
        }
    })

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-home" />
            <div className="dashboard-container">
                <h1>Teacher Home</h1>
            </div>
        </div>
    );
}
 
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(TeacherHome);