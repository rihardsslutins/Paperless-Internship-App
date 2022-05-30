// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";

const StudentHome = () => {

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

export default StudentHome;