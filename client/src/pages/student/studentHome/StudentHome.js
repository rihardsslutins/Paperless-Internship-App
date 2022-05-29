// redux
import { connect } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";

const StudentHome = (props) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!props.user.role) {
            navigate(`../login`)
        }
        if (!props.user.role === 'student') {
            navigate(`../${props.user.role}-home`)
        }
    })

    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-home" />
            <div className="dashboard-container">
                <h1>Student Home</h1>
            </div>
        </>
    );
}
 

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(StudentHome);