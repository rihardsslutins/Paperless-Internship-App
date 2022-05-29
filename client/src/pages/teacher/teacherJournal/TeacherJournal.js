// style
import "./TeacherJournal.css";
// atoms
import SearchInput from "../../../components/atoms/input/SearchInput";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
// import SelectInput from "../../../components/atoms/input/SelectInput";
import Table from "../../../components/organisms/table/Table";

// redux
import { connect } from "react-redux";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeacherJournal = (props) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!props.user.role) {
            navigate(`../login`)
        }
        if (!props.user.role === 'teacher') {
            navigate(`../${props.user.role}-home`)
        }
    })

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    // Search input
    const [searchQuery, setSearchQuery] = useState('');
    const changeSearchQuery = (e) => setSearchQuery(e.target.value);
    
    // Select input
    // const options = [
    //     {
    //         label: 'Visi',
    //         value: 'all'
    //     },
    //     {
    //         label: 'Atrodas praksē',
    //         value: 'active'
    //     },
    //     {
    //         label: 'Nav praksē',
    //         value: 'inactive'
    //     }
    // ]

    // Journal list
    const studentList = [
        {
            studentId: '567eu8rbcdfghijnsvx9',
            name: 'Juris',
            surname: 'Bērziņš',
            phone: '22123987',
            email: 'J.Berzins@gmail.com',
        },
        {
            studentId: '897ui56bchjnvxfe23e',
            name: 'Anna',
            surname: 'Krūmiņs',
            phone: '21564143',
            email: 'AnnKrumm@gmail.com',
        },
        {
            studentId: '87ui9hjn65bcmvxefgdr',
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
                        {/* <SelectInput options={options} /> */}
                    </div>
                    <Table headerCells={headerCells} data={studentList} link="../teacher-student-journals/"/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(TeacherJournal);