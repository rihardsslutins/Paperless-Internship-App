// style
import "./SupervisorHome.css";
// molecules
import HomeInvites from "../../../components/molecules/homeInvites/HomeInvites";
import HomeStudents from "../../../components/molecules/homeStudents/HomeStudents";
// organism
import HomeInfoProfile from "../../../components/organisms/homeInfoProfile/HomeInfoProfile";
import Sidebar from "../../../components/organisms/navbar/Sidebar";

import ThemeToggleRound from "../../../components/ThemeToggle/ThemeToggleRound";
// redux
import { connect } from "react-redux";
// react
import { useEffect, useState } from "react";
// packages
import axios from 'axios';
import Cookies from "js-cookie";

const SupervisorHome = (props) => {

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

    // Logged in users info
    const supervisor = props.user

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

    // Get intern list
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

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-home" />
            <div className="dashboard-container">
                <div className="supervisor-home">
                    <HomeInfoProfile user={supervisor} role='supervisor' />
                    <div className="supervisor-home-grid">
                        <HomeInvites invites={invites} role="supervisor" />
                        <HomeStudents studentList={internList} role="supervisor" />
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

export default connect(mapStateToProps)(SupervisorHome);