// style
import "./TeacherInvites.css";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import Invite from "../../../components/organisms/invite/Invite";
// react
import { useState, useEffect } from "react";
// redux
import { connect } from "react-redux";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const TeacherInvites = (props) => {

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    const [invites, setInvites] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);

    useEffect(() => {
        const getInvites = async () => {
            setIsPending(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/invites`, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('auth')}`
                    }
                })
                setInvites(response.data.invites);
                setIsPending(false);
            } catch (err) {
                console.log(err);
                setIsPending(false);
            }
        }
        getInvites()
    }, [refreshTable]);

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-invites" />
            <div className="dashboard-container teacher-invites">
                <h1>Uzaicinājumi</h1>
                {isPending && <div className="loading"></div>}
                {!isPending &&
                    <>
                        <Invite invites={invites} setRefreshTable={setRefreshTable} />
                        {!invites.length && <h2 className="teacher-invites-0">Nav neviena uzaicinājuma</h2> }
                    </>
                }
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(TeacherInvites);