// style
import "./TeacherInvites.css";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import Invite from "../../../components/organisms/invite/Invite";

// redux
import { connect } from "react-redux";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherInvites = (props) => {
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

    const handleAccept = () => {
        console.log('accept invite');
    }
    const handleReject = () => {
        console.log('reject invite');
    }

    // Invite
    const invites = [
        {
            id: "uibcdefgjmnrtv7986yhkx",
            title: "Prakses dienasgrāmata",
            from: "Jānis Ozols",
            companyName: "Accenture"
        },
        {
            id: "rgt56e4fvbhijklmnouy78",
            title: "Prakses dienasgrāmata",
            from: "Kārlis Krūmiņš",
            companyName: "AirBaltic"
        }
    ]

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-invites" />
            <div className="dashboard-container teacher-invites">
                <h1>Uzaicinājumi</h1>
                <Invite invites={invites} handleAccept={handleAccept} handleReject={handleReject} />
            </div>
        </div>
    );
}
 
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(TeacherInvites);