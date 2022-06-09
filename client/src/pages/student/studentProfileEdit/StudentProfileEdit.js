// style
import "./StudentProfileEdit.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
import Alert from "../../../components/atoms/alerts/Alert";
// assets
import PageButton from "../../../components/atoms/button/PageButton";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import UpdateProfileForm from "../../../components/organisms/form/UpdateProfileForm";
// redux
import { connect } from "react-redux";
// packages
import axios from 'axios';
import Cookies from "js-cookie";

import { useState } from "react";

const StudentProfileEdit = (props) => {

    const student = props.user

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    // // Logged in users info
    // const student = { 
    //     id: '6283abad20a71c3f8b4a2e07',
    //     name: "Ulvis",
    //     surname: "Čakstiņš",
    //     school: "Saldus thenikums",
    //     phone: 25412514,
    //     gender: "male",
    //     email: "ulvisc3@gmail.com",
    //     password: "parole123"
    // }

    const [editForm, setEditForm] = useState(true);

    const handlePasswordForm = () => {
        setEditForm(false);
        handleAlertClose();
    }

    // Edit user profile
    const [name, setName] = useState(student.name);
    const [surname, setSurname] = useState(student.surname);
    const [school, setSchool] = useState(student.school);
    const [phone, setPhone] = useState(student.phone);

    const changeName = e => setName(e.target.value);
    const changeSurname = e => setSurname(e.target.value);
    const changeSchool = e => setSchool(e.target.value);
    const changePhone = e => setPhone(e.target.value);

    const formNames = [student.name, student.surname, student.school, student.phone];
    const formLabels = ['Vārds:', 'Uzvārds:', 'Skola:', 'Tālrunis:'];
    const formTypes = ['text', 'text', 'text', 'number'];
    const onChangeArray = [changeName, changeSurname, changeSchool, changePhone];
    const formValue = [name, surname, school, phone];

    // const handleUpdateStudent = (e) => {
    //     e.preventDefault();
    //     if (name && surname && school && phone) {
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

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (oldPassword && newPassword && confirmNewPassword) {
            if (oldPassword === student.password) {
                if (newPassword === confirmNewPassword) {
                    console.log('Parole tika nomainīta!');
                    setAlert('');
                } else {
                    setAlert('Jaunā parole nesakrīt!');
                }
            } else {
                setAlert('Parole nav pareiza!');
            }
        } else {
            setAlert('Aizpildiet visus ievades laukus!');
        }
    }

    // Alert
    const [alert, setAlert] = useState('');
    const handleAlertClose = () => {
        setAlert('');
    };

    // change basic info
    const handleUpdateStudent = async (e) => {
        e.preventDefault()
        try {
            console.log(school)
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/change-me`, { role: student.role, email: student.email, name, surname, school, phone }, { headers: { Authorization: `Bearer ${Cookies.get('auth')}` } })
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
   
    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-settings" />
            <div className="dashboard-container">
                <div className="student-profile-edit">
                    <img className="student-profile-image" src={student.gender === "male" ? male : female} alt="profile" />
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
                            onClick={editForm ? handleUpdateStudent : handleChangePassword}
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

export default connect(mapStateToProps)(StudentProfileEdit);