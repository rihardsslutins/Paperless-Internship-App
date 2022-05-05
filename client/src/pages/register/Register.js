// style
import './Register.css';
// organisms
import Navbar from '../../components/organisms/navbar/Navbar';
import Roles from '../../components/organisms/roles/Roles';
import RegistrationForm from '../../components/organisms/form/RegistrationForm';
// hooks
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const Register = () => {
    const handleStudentRegistration = async (e) => {
        e.preventDefault();
        if (studentPassword === studentConfirmPassword) {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/students`, {
                name: studentName,
                surname: studentSurname,
                gender: studentGender,
                school: studentSchool,
                email: studentEmail,
                phone: studentPhone,
                password: studentPassword,
            });
        } else {
            console.log('password isnt equal to repeatpassword');
        }
    };

    const [searchParams] = useSearchParams();
    const handleTeacherRegistration = async (e) => {
        e.preventDefault();
        if (teacherPassword === teacherConfirmPassword) {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/teachers`, {
                name: teacherName,
                surname: teacherSurname,
                gender: teacherGender,
                school: teacherSchool,
                email: teacherEmail,
                phone: teacherPhone,
                password: teacherPassword,
            });
        } else {
            console.log('password isnt equal to repeatpassword');
        }
    };

    const handleSupervisorRegistration = async (e) => {
        e.preventDefault();
        if (supervisorPassword === supervisorConfirmPassword) {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/supervisors`, {
                name: supervisorName,
                surname: supervisorSurname,
                gender: supervisorGender,
                phone: supervisorPhone,
                field: supervisorField,
                company: {
                    name: supervisorCompanyName,
                    address: {
                        country: supervisorCompanyCountry,
                        city: supervisorCompanyCity,
                        zipCode: supervisorCompanyZipCode,
                        streetName: supervisorCompanyStreetName,
                        streetNumber: supervisorCompanyStreetNumber
                    },
                    registrationNumber: supervisorCompanyRegistrationNumber,
                    email: supervisorCompanyEmail,
                    phone: supervisorCompanyPhone
                },
                email: supervisorEmail,
                password: supervisorPassword
            });
        } else {
            console.log('password isnt equal to repeatpassword');
        }
    }
    
    // ROLES
    const [activeStudent, setActiveStudent] = useState(searchParams.get('role') === 'student' ? "-active" : '');
    const [activeTeacher, setActiveTeacher] = useState(searchParams.get('role') === 'teacher' ? "-active" : '');
    const [activeSupervisor, setActiveSupervisor] = useState(searchParams.get('role') === 'supervisor' ? "-active" : '');

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

    // STUDENT
    const [studentName, setStudentName] = useState('');
    const [studentSurname, setStudentSurname] = useState('');
    const [studentGender, setStudentGender] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentPhone, setStudentPhone] = useState('');
    const [studentPassword, setStudentPassword] = useState('');
    const [studentConfirmPassword, setStudentConfirmPassword] = useState('');

    const changeStudentName = (e) => setStudentName(e.target.value);
    const changeStudentSurname = (e) => setStudentSurname(e.target.value);
    const changeStudentGender = (e) => setStudentGender(e.target.value);
    const changeStudentSchool = (e) => setStudentSchool(e.target.value);
    const changeStudentEmail = (e) => setStudentEmail(e.target.value);
    const changeStudentPhone = (e) => setStudentPhone(e.target.value);
    const changeStudentPassword = (e) => setStudentPassword(e.target.value);
    const changeStudentConfirmPassword = (e) => setStudentConfirmPassword(e.target.value);

    const onChangeStudentArray = [
        changeStudentName,
        changeStudentSurname,
        changeStudentSchool,
        changeStudentEmail,
        changeStudentPhone,
        changeStudentPassword,
        changeStudentConfirmPassword
    ];
    const formLabelsStudent = [
        'Vārds',
        'Uzvārds',
        'Skola',
        'E-pasts',
        'Tālrunis',
        'Parole',
        'Parole atkārtoti'
    ];
    const formNamesStudent = [
        'name',
        'surname',
        'school',
        'email',
        'phone',
        'password',
        'confirmPassword'
    ];
    const formTypesStudent = [
        'text',
        'text',
        'text',
        'email',
        'number',
        'password',
        'password',
    ];

    // TEACHER REGISTRATION
    const [teacherName, setTeacherName] = useState('');
    const [teacherSurname, setTeacherSurname] = useState('');
    const [teacherGender, setTeacherGender] = useState('');
    const [teacherSchool, setTeacherSchool] = useState('');
    const [teacherEmail, setTeacherEmail] = useState('');
    const [teacherPhone, setTeacherPhone] = useState('');
    const [teacherPassword, setTeacherPassword] = useState('');
    const [teacherConfirmPassword, setTeacherConfirmPassword] = useState('');

    const changeTeacherName = (e) => setTeacherName(e.target.value);
    const changeTeacherSurname = (e) => setTeacherSurname(e.target.value);
    const changeTeacherGender = (e) => setTeacherGender(e.target.value);
    const changeTeacherSchool = (e) => setTeacherSchool(e.target.value);
    const changeTeacherEmail = (e) => setTeacherEmail(e.target.value);
    const changeTeacherPhone = (e) => setTeacherPhone(e.target.value);
    const changeTeacherPassword = (e) => setTeacherPassword(e.target.value);
    const changeTeacherConfirmPassword = (e) => setTeacherConfirmPassword(e.target.value);

    const onChangeTeacherArray = [
        changeTeacherName,
        changeTeacherSurname,
        changeTeacherSchool,
        changeTeacherEmail,
        changeTeacherPhone,
        changeTeacherPassword,
        changeTeacherConfirmPassword
    ];
    const formLabelsTeacher = [
        'Vārds',
        'Uzvārds',
        'Skola',
        'E-pasts',
        'Tālrunis',
        'Parole',
        'Parole atkārtoti'
    ];
    const formNamesTeacher = [
        'teacherName',
        'teacherSurname',
        'teacherSchool',
        'teacherEmail',
        'teacherPhone',
        'teacherPassword',
        'teacherConfirmPassword'
    ];
    const formTypesTeacher = [
        'text',
        'text',
        'text',
        'email',
        'number',
        'password',
        'password',
    ];

    // SUPERVISOR REGISTRATION
    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorSurname, setSupervisorSurname] = useState('');
    const [supervisorGender, setSuperVisorGender] = useState('');
    const [supervisorField, setSupervisorField] = useState('');
    const [supervisorCompanyName, setSupervisorCompanyName] = useState('');
    const [supervisorCompanyCountry, setSupervisorCompanyCountry] = useState('');
    const [supervisorCompanyCity, setSupervisorCompanyCity] = useState('');
    const [supervisorCompanyZipCode, setSupervisorCompanyZipCode] = useState('');
    const [supervisorCompanyStreetName, setSupervisorCompanyStreetName] = useState('');
    const [supervisorCompanyStreetNumber, setSupervisorCompanyStreetNumber] = useState('');
    const [supervisorCompanyRegistrationNumber, setSupervisorCompanyRegistrationNumber] = useState('');
    const [supervisorCompanyEmail, setSupervisorCompanyEmail] = useState('');
    const [supervisorCompanyPhone, setSupervisorCompanyPhone] = useState('');
    const [supervisorEmail, setSupervisorEmail] = useState('');
    const [supervisorPhone, setSupervisorPhone] = useState('');
    const [supervisorPassword, setSupervisorPassword] = useState('');
    const [supervisorConfirmPassword, setSupervisorConfirmPassword] = useState('');

    const changeSupervisorName = (e) => setSupervisorName(e.target.value);
    const changeSupervisorSurname = (e) => setSupervisorSurname(e.target.value);
    const changeSupervisorGender = (e) => setSuperVisorGender(e.target.value);
    const changeSupervisorPhone = (e) => setSupervisorPhone(e.target.value);
    const changeSupervisorField = (e) => setSupervisorField(e.target.value);
    const changeSupervisorCompanyName = (e) => setSupervisorCompanyName(e.target.value);
    const changeSupervisorCompanyCountry = (e) => setSupervisorCompanyCountry(e.target.value);
    const changeSupervisorCompanyCity = (e) => setSupervisorCompanyCity(e.target.value);
    const changeSupervisorCompanyZipCode = (e) => setSupervisorCompanyZipCode(e.target.value);
    const changeSupervisorCompanyStreetName = (e) => setSupervisorCompanyStreetName(e.target.value);
    const changeSupervisorCompanyStreetNumber = (e) => setSupervisorCompanyStreetNumber(e.target.value);
    const changeSupervisorCompanyRegistrationNumber = (e) => setSupervisorCompanyRegistrationNumber(e.target.value);
    const changeSupervisorCompanyEmail = (e) => setSupervisorCompanyEmail(e.target.value);
    const changeSupervisorCompanyPhone = (e) => setSupervisorCompanyPhone(e.target.value);
    const changeSupervisorEmail = (e) => setSupervisorEmail(e.target.value);
    const changeSupervisorPassword = (e) => setSupervisorPassword(e.target.value);
    const changeSupervisorConfirmPassword = (e) => setSupervisorConfirmPassword(e.target.value);

    const onChangeSupervisorArray = [
        changeSupervisorName,
        changeSupervisorSurname,
        changeSupervisorPhone,
        changeSupervisorField,
        changeSupervisorCompanyName,
        changeSupervisorCompanyCountry,
        changeSupervisorCompanyCity,
        changeSupervisorCompanyZipCode,
        changeSupervisorCompanyStreetName,
        changeSupervisorCompanyStreetNumber,
        changeSupervisorCompanyRegistrationNumber,
        changeSupervisorCompanyEmail,
        changeSupervisorCompanyPhone,
        changeSupervisorEmail,
        changeSupervisorPassword,
        changeSupervisorConfirmPassword
    ];
    const formLabelsSupervisor = [
        'Vārds:',
        'Uzvārds:',
        'Tālrunis:',
        'Nozare:',
        'Uzņēmuma nosaukums:',
        'Uzņēmuma valsts:',
        'Uzņēmuma pilsēta:',
        'Uzņēmuma pasta indekss:',
        'Uzņēmuma ielas nosaukums:',
        'Uzņēmuma ielas numurs:',
        'Uzņēmuma reģisrācijas numurs:',
        'Uzņēmuma e-pasts:',
        'Uzņēmuma tālrunis:',
        'E-pasts:',
        'Parole:',
        'Apstiprināt paroli:',
    ];
    const formNamesSupervisor = [
    	'supervisorName',
        'supervisorSurname',
        'supervisorPhone',
        'supervisorField',
        'supervisorCompanyName',
        'supervisorCompanyCountry',
        'supervisorCompanyCity',
        'supervisorCompanyZipCode',
        'supervisorCompanyStreetName',
        'supervisorCompanyStreetNumber',
        'supervisorCompanyRegistrationNumber',
        'supervisorCompanyEmail',
        'supervisorCompanyPhone',
        'supervisorEmail',
        'supervisorPassword',
        'supervisorConfirmPassword',
    ];
    const formTypesSupervisor = [
        'text',
        'text',
        'number',
        'text',
        'text',
        'text',
        'text',
        'text',
        'text',
        'number',
        'text',
        'email',
        'number',
        'email',
        'password',
        'password',
    ];

    return (
        <div>
            <Navbar page="register" />
            <div className="container registration">
                <h2>Reģistrācija{studentGender}</h2>
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
                        id={formNamesStudent}
                        name={formNamesStudent}
                        label={formLabelsStudent}
                        type={formTypesStudent}
                        onChange={onChangeStudentArray}
                        radioOnClick={changeStudentGender}
                        onClick={handleStudentRegistration}
                        buttonText="Reģistrēties kā students"
                    />
                )}
                {activeTeacher && (
                    <RegistrationForm
                        id={formNamesTeacher}
                        name={formNamesTeacher}
                        label={formLabelsTeacher}
                        type={formTypesTeacher}
                        onChange={onChangeTeacherArray}
                        radioOnClick={changeTeacherGender}
                        onClick={handleTeacherRegistration}
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
                        radioOnClick={changeSupervisorGender}
                        onClick={handleSupervisorRegistration}
                        buttonText="Reģistrēties kā prakses vadītājs"
                    />
                )}
            </div>
        </div>
    );
};

export default Register;
