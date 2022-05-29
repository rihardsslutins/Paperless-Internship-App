// style
import "./SupervisorJournal.css";

// redux
import { connect } from "react-redux";

// atoms
import SearchInput from "../../../components/atoms/input/SearchInput";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
// import SelectInput from "../../../components/atoms/input/SelectInput";
import Table from "../../../components/organisms/table/Table";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SupervisorJournal = (props) => {
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

    // Search input
    const [searchQuery, setSearchQuery] = useState('');
    const changeSearchQuery = (e) => setSearchQuery(e.target.value);

    // Journal list
    const studentList = [
        {
            journalId: '31928h312312ui3adww',
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
                    <Table headerCells={headerCells} data={studentList} link="../supervisor-student-journal/" />
                </div>
            </div>
        </div>
    );
}
 
const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(SupervisorJournal);