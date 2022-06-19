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
        getInvites();
    }, [])

    // Get intern list
    const [internList, setInternList] = useState([]);
    const [isPendingStudents, setIsPendingStudents] = useState(false);
    useEffect(() => {
        const getInternList = async () => {
            setIsPendingStudents(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/user`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setInternList(response.data.users);
                setIsPendingStudents(false);
            } catch (err) {
                console.log(err);
                setIsPendingStudents(false);
            }
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
                        <HomeInvites invites={invites} role="supervisor" isPending={isPendingInvites} />
                        <HomeStudents studentList={internList} role="supervisor" isPending={isPendingStudents} />
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