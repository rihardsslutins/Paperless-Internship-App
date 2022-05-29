import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { connect } from "react-redux";

// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";

const SupervisorHome = (props) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!props.user.role) {
            navigate(`../login`)
        }
        if (!props.user.role === 'supervisor') {
            navigate(`../${props.user.role}-home`)
        }
    })

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-home" />
            <div className="dashboard-container student-home">
                <h1>Supervisor Home</h1>
            </div>
        </div>
    );
}
 
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(SupervisorHome);