// style
import "./TeacherJournal.css";
// atoms
import SearchInput from "../../../components/atoms/input/SearchInput";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import StudentsTable from "../../../components/organisms/table/StudentsTable";
// hooks
import { useState } from "react";

const TeacherJournal = () => {

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    // Search input
    const [searchQuery, setSearchQuery] = useState('');
    const changeSearchQuery = (e) => setSearchQuery(e.target.value);

    // Journal list
    const studentList = [
        {
            _id: '567eu8rbcdfghijnsvx9',
            name: 'Juris',
            surname: 'Bērziņš',
            phone: '22123987',
            email: 'J.Berzins@gmail.com',
        },
        {
            _id: '897ui56bchjnvxfe23e',
            name: 'Anna',
            surname: 'Krūmiņs',
            phone: '21564143',
            email: 'AnnKrumm@gmail.com',
        },
        {
            _id: '87ui9hjn65bcmvxefgdr',
            name: 'Kārlis',
            surname: 'Ozols',
            phone: '29587904',
            email: 'Karlis123@inbox.lv',
        }
    ]

    // Table
    const headerCells = ['Vārds', 'Uzvārds', 'Tālrunis', 'E-pasts'];

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-journal" />
            <div className="dashboard-container">
                <div className="teacher-journal">
                    <h1>Studenti</h1>
                    <div className="teacher-journal-table-filter">
                        <SearchInput onChange={changeSearchQuery} />
                    </div>
                    <StudentsTable headerCells={headerCells} data={studentList} link="../teacher-student-journals/"/>
                </div>
            </div>
        </div>
    );
}

export default TeacherJournal;