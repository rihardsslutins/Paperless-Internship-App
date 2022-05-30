// style
import "./SupervisorInvites.css";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import Invite from "../../../components/organisms/invite/Invite";

const SupervisorInvites = () => {

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

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
            school: "Saldus tehnikums",
            companyName: "Accenture"
        },
        {
            id: "rgt56e4fvbhijklmnouy78",
            title: "Prakses dienasgrāmata",
            from: "Kārlis Krūmiņš",
            school: "Ventspils tehnikums",
            companyName: "Accenture"
        }
    ]

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-invites" />
            <div className="dashboard-container supervisor-invites">
                <h1>Uzaicinājumi</h1>
                <Invite invites={invites} handleAccept={handleAccept} handleReject={handleReject} />
                {!invites.length && <h2 className="supervisor-invites-0">Nav neviena uzaicinājuma</h2> }
            </div>
        </>
    );
}
 
export default SupervisorInvites;