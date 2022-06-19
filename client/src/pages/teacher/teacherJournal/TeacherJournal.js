// style
import "./TeacherJournal.css";
// atoms
import SearchInput from "../../../components/atoms/input/SearchInput";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import StudentsTable from "../../../components/organisms/table/StudentsTable";
// hooks
import { useEffect, useState } from "react";
// packages
import axios from 'axios'
import Cookies from "js-cookie";

const TeacherJournal = () => {

    const [isPending, setIsPending] = useState(false);

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    // Search input
    const [searchQuery, setSearchQuery] = useState('');
    const changeSearchQuery = (e) => setSearchQuery(e.target.value);

    const [studentList, setStudentList] = useState([]);
    const [studentSearchList, setStudentSearchList] = useState([]);

    // Gets all students
    useEffect(() => {
        const getStudentList = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setStudentList(response.data.users);
                setIsPending(false); 
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getStudentList()
    }, [])

    // Gets students based on search query
    useEffect(() => {
        let searchList = [];
        studentList.map((student) => {
            if (student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.phone.toString().includes(searchQuery) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                searchList.push(student);
            }
        })
        setStudentSearchList(searchList);
    }, [searchQuery, studentList])

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
                    <StudentsTable 
                        headerCells={headerCells} 
                        data={searchQuery ? studentSearchList : studentList} 
                        link="../teacher-student-journals/"
                        isPending={isPending}
                    />
                </div>
            </div>
        </div>
    );
}

export default TeacherJournal;