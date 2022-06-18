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
    const teacher = props.user
    // const user = {   
    //     id: "62a7acc0c502faef4f3c8b0d",
    //     school: "Saldus tehnikums",
    //     name: "Elīna",
    //     surname: "Dēvita",
    //     phone: 2839949,
    //     gender: "female",
    //     email: "elinadevita@gmail.com",
    //     password: "password",
    //     role: "teacher",
    //     students: [
    //         {
    //             fullName: "Rihards Slūtiņš",
    //             email: "rihardsslutins@yahoo.com",
    //             id: "62ab882b8e8dd7fc859cb82a"
    //         }
    //     ]
    // }

    // Journal invites
    const [invites, setInvites] = useState([])
    useEffect(() => {
        try {
            const getInvites = async () => {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/invites`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setInvites(response.data.invites)
            }
            getInvites()
        } catch (err) {
            console.log(err)
        }
    }, [])
    // const invites = [
    //     {
    //         id: "62ab88418e8dd7fc859cb862",
    //         sender: "rihardsslutins@yahoo.com",
    //         senderFullName: "Rihards Slūtiņš",
    //         receiver: "robertstarhanovs@gmail.com",
    //         receiverFullName: "Roberts Tarhanovs",
    //         subject: "Prakses dienasgrāmata",
    //         body: "Rihards Slūtiņš no Saldus tehnikums uzaicināja Jūs pievienoties savai dienasgrāmatai"
    //     },
    //     {
    //         id: "87uij569hn4deftvbmcn9j",
    //         sender: "ulvisc3@gmail.com",
    //         senderFullName: "Ulvis Čakstiņš",
    //         receiver: "robertstarhanovs@gmail.com",
    //         receiverFullName: "Roberts Tarhanovs",
    //         subject: "Prakses dienasgrāmata",
    //         body: "Ulvis Čakstiņš no Saldus tehnikums uzaicināja Jūs pievienoties savai dienasgrāmatai"
    //     }
    // ];
    const [studentList, setStudentList] = useState([])
    useEffect(() => {
        const getStudentList = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            })
            console.log(response)
            setStudentList(response.data.users)
        }
        getStudentList()
    }, [])
    // Journal list
    // const studentList = [
    //     {
    //         id: '31928h312312ui3adww',
    //         name: 'Ulvis',
    //         surname: 'Čakstiņš',
    //         email: 'ulvis@gmail.com',
    //         phone: '21789871'
    //     },
    //     {
    //         id: '98ijmu6n7b5cdefrv4t',
    //         name: 'Rihards',
    //         surname: 'Slūtiņš',
    //         email: 'rihardsslutins@gmail.com',
    //         phone: '21861982'
    //     }
    // ];

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-home" />
            <div className="dashboard-container">
                <div className="teacher-home">
                    <HomeInfoProfile user={teacher} role='teacher' />
                    <div className="teacher-home-grid">
                        <HomeInvites invites={invites} role="teacher" />
                        <HomeStudents studentList={studentList} role="teacher" />
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