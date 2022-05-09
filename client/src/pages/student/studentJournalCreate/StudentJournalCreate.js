// style
import "./StudentJournalCreate.css";
// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";

const StudentJournalCreate = () => {
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journal', 'student-mail', 'student-settings', 'help'];

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-journal" />
            <div className="dashboard-container">
                <div className="student-journal-create">
                    <h1>Dienasgrāmatas izveide</h1>        
                </div>
            </div>
        </>
    );
}
 
export default StudentJournalCreate;