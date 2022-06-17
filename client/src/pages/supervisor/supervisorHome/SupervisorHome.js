// style
import "./SupervisorHome.css";
// molecules
import HomeInvites from "../../../components/molecules/homeInvites/HomeInvites";
import HomeStudents from "../../../components/molecules/homeStudents/HomeStudents";
// organism
import HomeInfoProfile from "../../../components/organisms/homeInfoProfile/HomeInfoProfile";
import Sidebar from "../../../components/organisms/navbar/Sidebar";

import ThemeToggleRound from "../../../components/ThemeToggle/ThemeToggleRound";

const SupervisorHome = () => {

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

    // Logged in users info
    const user = { 
        id: '6283abad20a71c3f8b4a2e07',
        field: "Programmēšana",
        company: "Accenture",
        name: "Roberts",
        surname: "Tarhanovs",
        phone: 28839540,
        gender: "male",
        email: "robertstarhanovs@gmail.com",
        password: "password",
        role: "supervisor",
        interns: [
        ]
    }

    // Journal invites
    const invites = [
        {
            id: "62ab88418e8dd7fc859cb862",
            sender: "rihardsslutins@yahoo.com",
            senderFullName: "Rihards Slūtiņš",
            receiver: "robertstarhanovs@gmail.com",
            receiverFullName: "Roberts Tarhanovs",
            subject: "Prakses dienasgrāmata",
            body: "Rihards Slūtiņš no Saldus tehnikums uzaicināja Jūs pievienoties savai dienasgrāmatai"
        },
        {
            id: "87uij569hn4deftvbmcn9j",
            sender: "ulvisc3@gmail.com",
            senderFullName: "Ulvis Čakstiņš",
            receiver: "robertstarhanovs@gmail.com",
            receiverFullName: "Roberts Tarhanovs",
            subject: "Prakses dienasgrāmata",
            body: "Ulvis Čakstiņš no Saldus tehnikums uzaicināja Jūs pievienoties savai dienasgrāmatai"
        }
    ];

    // Journal list
    const studentList = [
        {
            id: '31928h312312ui3adww',
            name: 'Ulvis',
            surname: 'Čakstiņš',
            email: 'ulvis@gmail.com',
            phone: '21789871'
        },
        {
            id: '98ijmu6n7b5cdefrv4t',
            name: 'Rihards',
            surname: 'Slūtiņš',
            email: 'rihardsslutins@gmail.com',
            phone: '21861982'
        }
    ];

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-home" />
            <div className="dashboard-container">
                <div className="supervisor-home">
                    <HomeInfoProfile user={user} role='supervisor' />
                    <div className="supervisor-home-grid">
                        <HomeInvites invites={invites} role="supervisor" />
                        <HomeStudents studentList={studentList} role="supervisor" />
                    </div>
                    <ThemeToggleRound />
                </div>
            </div>
        </div>
    );
}

export default SupervisorHome;