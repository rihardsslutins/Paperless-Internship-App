// style
import "./SupervisorJournal.css";
// atoms
import SearchInput from "../../../components/atoms/input/SearchInput";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
// import SelectInput from "../../../components/atoms/input/SelectInput";
import StudentsJournalTable from "../../../components/organisms/table/StudentsJournalTable";

import { useState } from "react";

const SupervisorJournal = () => {

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

    // Search input
    const [searchQuery, setSearchQuery] = useState('');
    const changeSearchQuery = (e) => setSearchQuery(e.target.value);

    // Journal list
    const studentList = [
        {
            _id: '31928h312312ui3adww',
            name: 'Juris',
            surname: 'Bērziņš',
            phone: '22123987',
            email: 'J.Berzins@gmail.com',
        }
    ]
    
    // Table
    const headerCells = ['Vārds', 'Uzvārds', 'Tālrunis', 'E-pasts'];

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-journal" />
            <div className="dashboard-container">
                <div className="supervisor-journal">
                    <h1>Praktikanti</h1>
                    <div className="supervisor-journal-table-filter">
                        <SearchInput onChange={changeSearchQuery} />
                        {/* <SelectInput options={options} /> */}
                    </div>
                    <StudentsJournalTable headerCells={headerCells} data={studentList} link="../supervisor-student-journal/" />
                </div>
            </div>
        </div>
    );
}

export default SupervisorJournal;