// style
import "./TeacherHome.css";
// molecules
import HomeInvites from "../../../components/molecules/homeInvites/HomeInvites";
import HomeStudents from "../../../components/molecules/homeStudents/HomeStudents";
// organism
import HomeInfoProfile from "../../../components/organisms/homeInfoProfile/HomeInfoProfile";
import Sidebar from "../../../components/organisms/navbar/Sidebar";

import ThemeToggleRound from "../../../components/ThemeToggle/ThemeToggleRound";
// react
import { useEffect, useState } from "react";
// redux
import { connect } from "react-redux";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const TeacherHome = (props) => {

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    // Logged in users info
    const teacher = props.user;

    // Journal invites
    const [invites, setInvites] = useState([]);
    const [isPendingInvites, setIsPendingInvites] = useState(false);
    useEffect(() => {
            const getInvites = async () => {
                setIsPendingInvites(true);
                try {
                    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/invites`, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('auth')}`
                        }
                    })
                    setInvites(response.data.invites);
                    setIsPendingInvites(false);
                } catch (err) {
                    console.log(err);
                    setIsPendingInvites(false);
                }
            }
            getInvites()
    }, [])

    // Get student list
    const [studentList, setStudentList] = useState([]);
    const [isPendingStudents, setIsPendingStudents] = useState(false);
    useEffect(() => {
        const getStudentList = async () => {
            setIsPendingStudents(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setStudentList(response.data.users);
                setIsPendingStudents(false);
            } catch (err) {
                console.log(err);
                setIsPendingStudents(false);
            }
        }
        getStudentList()
    }, [])

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-home" />
            <div className="dashboard-container">
                <div className="teacher-home">
                    <HomeInfoProfile user={teacher} role='teacher' />
                    <div className="teacher-home-grid">
                        <HomeInvites invites={invites} role="teacher" isPending={isPendingInvites} />
                        <HomeStudents studentList={studentList} role="teacher" isPending={isPendingStudents} />
                    </div>
                    <ThemeToggleRound />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(TeacherHome);