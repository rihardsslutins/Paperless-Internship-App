// style
import './Register.css';
// organisms
import Navbar from '../../components/organisms/navbar/Navbar';
import Roles from '../../components/organisms/roles/Roles';
import RegistrationForm from '../../components/organisms/form/RegistrationForm';

import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const handleStudentRegister = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/students`, {
                name,
                surname,
                gender,
                school,
                email,
                phone,
                password,
            });
        } else {
            console.log('password isnt equal to repeatpassword');
        }
    };
    // ROLES
    const [activeStudent, setActiveStudent] = useState('');
    const [activeTeacher, setActiveTeacher] = useState('');
    const [activeSupervisor, setActiveSupervisor] = useState('');

    const handleStudent = () => {
        setActiveStudent('-active');
        setActiveTeacher('');
        setActiveSupervisor('');
    };
    const handleTeacher = () => {
        setActiveTeacher('-active');
        setActiveStudent('');
        setActiveSupervisor('');
    };
    const handleSupervisor = () => {
        setActiveSupervisor('-active');
        setActiveTeacher('');
        setActiveStudent('');
    };

    // STUDENT/TEACHER REGISTRATION
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('');
    const [school, setSchool] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const changeName = (e) => setName(e.target.value);
    const changesurname = (e) => setSurname(e.target.value);
    const changeGender = (e) => setGender(e.target.value);
    const changeSchool = (e) => setSchool(e.target.value);
    const changeEmail = (e) => setEmail(e.target.value);
    const changePhone = (e) => setPhone(e.target.value);
    const changePassword = (e) => setPassword(e.target.value);
    const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const onChangeArray = [
        changeName,
        changesurname,
        changeSchool,
        changeEmail,
        changePhone,
        changePassword,
        changeConfirmPassword,
    ];
    const formLabels = [
        'Vārds:',
        'Uzvārds:',
        'Skola:',
        'E-pasts:',
        'Tālrunis:',
        'Parole:',
        'Apstiprināt paroli:',
    ];
    const formNames = [
        'name',
        'surname',
        'school',
        'email',
        'phone',
        'password',
        'confirmPassword',
    ];
    const formTypes = [
        'text',
        'text',
        'text',
        'email',
        'text',
        'password',
        'password',
    ];

    // SUPERVISOR REGISTRATION
    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorSurname, setSupervisorSurname] = useState('');
    const [supervisorCompany, setSupervisorCompany] = useState('');
    const [supervisorPosition, setSupervisorPosition] = useState('');
    const [supervisorEmail, setSupervisorEmail] = useState('');
    const [supervisorPhone, setSupervisorPhone] = useState('');
    const [supervisorPassword, setSupervisorPassword] = useState('');
    const [supervisorConfirmPassword, setSupervisorConfirmPassword] = useState('');

    const changeSupervisorName = (e) => setSupervisorName(e.target.value);
    const changeSupervisorsurname = (e) => setSupervisorSurname(e.target.value);
    const changeSupervisorCompany = (e) => setSupervisorCompany(e.target.value);
    const changeSupervisorPosition = (e) => setSupervisorPosition(e.target.value);
    const changeSupervisorEmail = (e) => setSupervisorEmail(e.target.value);
    const changeSupervisorPhone = (e) => setSupervisorPhone(e.target.value);
    const changeSupervisorPassword = (e) => setSupervisorPassword(e.target.value);
    const changeSupervisorConfirmPassword = (e) => setSupervisorConfirmPassword(e.target.value);

    const onChangeSupervisorArray = [
        changeSupervisorName,
        changeSupervisorsurname,
        changeSupervisorCompany,
        changeSupervisorPosition,
        changeSupervisorEmail,
        changeSupervisorPhone,
        changeSupervisorPassword,
        changeSupervisorConfirmPassword,
    ];
    const formLabelsSupervisor = [
        'Vārds:',
        'Uzvārds:',
        'Uzņēmuma nosaukums:',
        'Amats:',
        'E-pasts:',
        'Tālrunis:',
        'Parole:',
        'Apstiprināt paroli:',
    ];
    const formNamesSupervisor = [
        'name',
        'surname',
        'companyName',
        'position',
        'email',
        'phone',
        'password',
        'confirmPassword',
    ];
    const formTypesSupervisor = [
        'text',
        'text',
        'text',
        'text',
        'email',
        'text',
        'password',
        'password',
    ];

    return (
        <div>
            <Navbar page="register" />
            <div className="container registration">
                <h2>Reģistrācija{gender}</h2>
                <Roles
                    handleStudent={handleStudent}
                    handleTeacher={handleTeacher}
                    handleSupervisor={handleSupervisor}
                    activeStudent={activeStudent}
                    activeTeacher={activeTeacher}
                    activeSupervisor={activeSupervisor}
                />
                {activeStudent && (
                    <RegistrationForm
                        id={formNames}
                        name={formNames}
                        label={formLabels}
                        type={formTypes}
                        onChange={onChangeArray}
                        radioOnClick={changeGender}
                        onClick={handleStudentRegister}
                        buttonText="Reģistrēties kā students"
                    />
                )}
                {activeTeacher && (
                    <RegistrationForm
                        id={formNames}
                        name={formNames}
                        label={formLabels}
                        type={formTypes}
                        onChange={onChangeArray}
                        radioOnClick={changeGender}
                        buttonText="Reģistrēties kā skolotājs"
                    />
                )}
                {activeSupervisor && (
                    <RegistrationForm
                        id={formNamesSupervisor}
                        name={formNamesSupervisor}
                        label={formLabelsSupervisor}
                        type={formTypesSupervisor}
                        onChange={onChangeSupervisorArray}
                        radioOnClick={changeGender}
                        buttonText="Reģistrēties kā prakses vadītājs"
                    />
                )}
            </div>
        </div>
    );
};

export default Register;
