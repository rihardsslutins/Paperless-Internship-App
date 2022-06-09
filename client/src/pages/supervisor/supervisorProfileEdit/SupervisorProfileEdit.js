// style
import "./SupervisorProfileEdit.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
// assets
import PageButton from "../../../components/atoms/button/PageButton";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import UpdateProfileForm from "../../../components/organisms/form/UpdateProfileForm";

import { useState } from "react";
import Alert from "../../../components/atoms/alerts/Alert";
// redux
import { connect } from "react-redux";
// packages
import axios from 'axios';
import Cookies from "js-cookie";

const SupervisorProfileEdit = (props) => {

    const supervisor = props.user

    // change basic info
    const handleUpdateSupervisor = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/change-me`,
                {   
                    id: supervisor._id,
                    role: supervisor.role, 
                    name, 
                    surname, 
                    company,
                    field, 
                    phone
                },
                { 
                    headers: { 
                        Authorization: `Bearer ${Cookies.get('auth')}` 
                    } 
                }
                )
        } catch (err) {
            console.log(err.response.data.errors)
        }
    }
    const handleChangePassword = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/reset`,
            {   
                id: supervisor._id,
                oldPassword,
                newPassword
            },
            { 
                headers: { 
                    Authorization: `Bearer ${Cookies.get('auth')}` 
                } 
            }
            )
        } catch (err) {
            console.log(err.response.data.errors)
        }
    }

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['supervisor-home', 'supervisor-journal', 'supervisor-mail', 'supervisor-invites', 'supervisor-settings', 'help'];

    // // Logged in users info
    // const supervisor = { 
    //     id: 'uiytcfdg6hjnrv7bm12ee3',
    //     name: "Juris",
    //     surname: "Ozols",
    //     phone: 28490186,
    //     email: "ozols123@gmail.com",
    //     gender: "male",
    //     company: "Accenture",
    //     field: "Full Stack Web Developer",
    //     password: "parole123"
    // }

    const [editForm, setEditForm] = useState(true);

    const handlePasswordForm = () => {
        setEditForm(false);
        handleAlertClose();
    }

    // Edit user profile
    const [name, setName] = useState(supervisor.name);
    const [surname, setSurname] = useState(supervisor.surname);
    const [phone, setPhone] = useState(supervisor.phone);
    const [company, setCompany] = useState(supervisor.company);
    const [field, setField] = useState(supervisor.field);

    const changeName = e => setName(e.target.value);
    const changeSurname = e => setSurname(e.target.value);
    const changePhone = e => setPhone(e.target.value);
    const changeCompany = e => setCompany(e.target.value);
    const changeField = e => setField(e.target.value);

    const formNames = [supervisor.name, supervisor.surname, supervisor.phone, supervisor.company, supervisor.field];
    const formLabels = ['Vārds:', 'Uzvārds:', 'Tālrunis:', 'Uzņēmums:', 'Nozare:'];
    const formTypes = ['text', 'text', 'number', 'text', 'text'];
    const onChangeArray = [changeName, changeSurname, changePhone, changeCompany, changeField];
    const formValue = [name, surname, phone, company, field];

    // const handleUpdateStudent = (e) => {
    //     e.preventDefault();
    //     if (name.length && surname.length && phone && company.length && field.length) {
    //         console.log(name, surname, phone, company, field);
    //         setAlert('');
    //     } else {
    //         setAlert('Aizpildiet visus ievades laukus!');
    //     }
    // }

    // Edit user password
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const changeOldPassword = e => setOldPassword(e.target.value);
    const changeNewPassword = e => setNewPassword(e.target.value);
    const changeConfirmNewPassword = e => setConfirmNewPassword(e.target.value);

    const passwordFormNames = ['oldPassword', 'newPassword', 'confirmNewPassword'];
    const passwordFormLabels = ['Pašreizējā parole:', 'Jaunā parole:', 'Apstiprināt paroli:'];
    const passwordFormTypes = ['password', 'password', 'password'];
    const passwordFormOnChange = [changeOldPassword, changeNewPassword, changeConfirmNewPassword];

    // const handleChangePassword = (e) => {
    //     e.preventDefault();
    //     if (oldPassword.length && newPassword.length && confirmNewPassword.length) {
    //         if (oldPassword === supervisor.password) {
    //             if (newPassword === confirmNewPassword) {
    //                 console.log('Parole tika nomainīta!');
    //                 setAlert('');
    //             } else {
    //                 setAlert('Jaunā parole nesakrīt!');
    //             }
    //         } else {
    //             setAlert('Parole nav pareiza!');
    //         }
    //     } else {
    //         setAlert('Aizpildiet visus ievades laukus!');
    //     }
    // }

    // Alert
    const [alert, setAlert] = useState('');

    const handleAlertClose = () => {
        setAlert('');
    };
   
    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="supervisor-settings" />
            <div className="dashboard-container">
                <div className="supervisor-profile-edit">
                    <img className="supervisor-profile-image" src={supervisor.gender === "male" ? male : female} alt="profile" />
                    {editForm && 
                        <div className="change-password">
                            <PageButton text='Mainīt paroli' onClick={handlePasswordForm} />
                        </div>
                    }
                    {alert && 
                        <Alert 
                            type='warning'
                            text={alert}
                            handleAlertClose={handleAlertClose}
                        />
                    }
                        <UpdateProfileForm
                            editForm={editForm}
                            id={editForm ? formNames : passwordFormNames}
                            name={editForm ? formNames : passwordFormNames}
                            label={editForm ? formLabels : passwordFormLabels}
                            type={editForm ? formTypes : passwordFormTypes}
                            onChange={editForm ? onChangeArray : passwordFormOnChange}
                            value={editForm ? formValue : ''}
                            onClick={editForm ? handleUpdateSupervisor : handleChangePassword}
                            buttonText={editForm ? 'Saglabāt izmaiņas' : 'Mainīt paroli'}
                        />
                </div>
            </div>
        </>
    );
}
 
const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(SupervisorProfileEdit);