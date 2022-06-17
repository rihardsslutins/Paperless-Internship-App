// style
import "./SupervisorJournal.css";
// atoms
import SearchInput from "../../../components/atoms/input/SearchInput";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
// import SelectInput from "../../../components/atoms/input/SelectInput";
import StudentsJournalTable from "../../../components/organisms/table/StudentsJournalTable";
// hooks
import { useEffect, useState } from "react";
// packages
import axios from 'axios'
import Cookies from "js-cookie";


const SupervisorJournal = () => {

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

    // Search input
    const [searchQuery, setSearchQuery] = useState('');
    const changeSearchQuery = (e) => setSearchQuery(e.target.value);

    const [internList, setInternList] = useState([])

    useEffect(() => {
        const getInternList = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            })
            console.log(response)
            setInternList(response.data.users)
        }
        getInternList()
    }, [])
    
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
                    <StudentsJournalTable headerCells={headerCells} data={internList} link="../supervisor-student-journal/" />
                </div>
            </div>
        </div>
    );
}

export default SupervisorJournal;