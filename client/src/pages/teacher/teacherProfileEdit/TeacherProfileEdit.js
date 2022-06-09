// style
import "./TeacherProfileEdit.css";
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

const TeacherProfileEdit = (props) => {

    const teacher = props.user

    // change basic info
    const handleUpdateTeacher = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/change-me`,
                {   
                    id: teacher._id,
                    role: teacher.role, 
                    name, 
                    surname, 
                    school,
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
            console.log(teacher._id)
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/reset`,
            {   
                id: teacher._id,
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
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    // // Logged in users info
    // const teacher = { 
    //     id: 'uitycfjdghnvmkr6578rfed',
    //     name: "Zane",
    //     surname: "Krūmiņa",
    //     school: "Saldus thenikums",
    //     phone: 28490186,
    //     gender: "female",
    //     email: "zan.kru@gmail.com",
    //     password: "parole123"
    // }

    const [editForm, setEditForm] = useState(true);

    const handlePasswordForm = () => {
        setEditForm(false);
        handleAlertClose();
    }

    // Edit user profile
    const [name, setName] = useState(teacher.name);
    const [surname, setSurname] = useState(teacher.surname);
    const [school, setSchool] = useState(teacher.school);
    const [phone, setPhone] = useState(teacher.phone);

    const changeName = e => setName(e.target.value);
    const changeSurname = e => setSurname(e.target.value);
    const changeSchool = e => setSchool(e.target.value);
    const changePhone = e => setPhone(e.target.value);

    const formNames = [teacher.name, teacher.surname, teacher.school, teacher.phone];
    const formLabels = ['Vārds:', 'Uzvārds:', 'Skola:', 'Tālrunis:'];
    const formTypes = ['text', 'text', 'text', 'number'];
    const onChangeArray = [changeName, changeSurname, changeSchool, changePhone];
    const formValue = [name, surname, school, phone];

    // const handleUpdateTeacher = (e) => {
    //     e.preventDefault();
    //     if (name.length && surname.length && school.length && phone) {
    //         console.log(name, surname, school, phone);
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
    //         if (oldPassword === teacher.password) {
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
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-settings" />
            <div className="dashboard-container">
                <div className="teacher-profile-edit">
                    <img className="teacher-profile-image" src={teacher.gender === "male" ? male : female} alt="profile" />
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
                            onClick={editForm ? handleUpdateTeacher : handleChangePassword}
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

export default connect(mapStateToProps)(TeacherProfileEdit);