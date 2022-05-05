// style
import "./Register.css";
// organisms
import Navbar from "../../components/organisms/navbar/Navbar";
import Roles from "../../components/organisms/roles/Roles";
import RegistrationForm from "../../components/organisms/form/RegistrationForm";

// hooks
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const Register = () => {

    const [searchParams] = useSearchParams();

    // ROLES
    const [activeStudent, setActiveStudent] = useState(searchParams.get('role') === 'student' ? "-active" : '');
    const [activeTeacher, setActiveTeacher] = useState(searchParams.get('role') === 'teacher' ? "-active" : '');
    const [activeSupervisor, setActiveSupervisor] = useState(searchParams.get('role') === 'supervisor' ? "-active" : '');

    const handleStudent = () => {
        setActiveStudent("-active");
        setActiveTeacher('');
        setActiveSupervisor('');
    }
    const handleTeacher = () => {
        setActiveTeacher("-active");
        setActiveStudent('');
        setActiveSupervisor('');
    }
    const handleSupervisor = () => {
        setActiveSupervisor("-active");
        setActiveTeacher('');
        setActiveStudent('');
    }

    // STUDENT/TEACHER REGISTRATION
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [school, setSchool] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');


    const changeName = (e) => setName(e.target.value);
    const changeLastname = (e) => setLastname(e.target.value);
    const changeSchool = (e) => setSchool(e.target.value);
    const changeEmail = (e) => setEmail(e.target.value);
    const changePhone = (e) => setPhone(e.target.value);
    const changePassword = (e) => setPassword(e.target.value);
    const changeConfirmPassword = (e) => setConfirmPassword(e.target.value);

    const onChangeArray = [changeName, changeLastname, changeSchool, changeEmail, changePhone, changePassword, changeConfirmPassword];
    const formLabels = ['Vārds:', 'Uzvārds:', 'Skola:', 'E-pasts:', 'Tālrunis:', 'Parole:', 'Apstiprināt paroli:'];
    const formNames = ['name', 'lastname', 'school', 'email', 'phone', 'password', 'confirmPassword'];
    const formTypes = ['text', 'text', 'text', 'email', 'text', 'password', 'password'];

    // SUPERVISOR REGISTRATION
    const [supervisorName, setSupervisorName] = useState('');
    const [supervisorLastname, setSupervisorLastname] = useState('');
    const [supervisorCompany, setSupervisorCompany] = useState('');
    const [supervisorPosition, setSupervisorPosition] = useState('');
    const [supervisorEmail, setSupervisorEmail] = useState('');
    const [supervisorPhone, setSupervisorPhone] = useState('');
    const [supervisorPassword, setSupervisorPassword] = useState('');
    const [supervisorConfirmPassword, setSupervisorConfirmPassword] = useState('');


    const changeSupervisorName = (e) => setSupervisorName(e.target.value);
    const changeSupervisorLastname = (e) => setSupervisorLastname(e.target.value);
    const changeSupervisorCompany = (e) => setSupervisorCompany(e.target.value);
    const changeSupervisorPosition = (e) => setSupervisorPosition(e.target.value);
    const changeSupervisorEmail = (e) => setSupervisorEmail(e.target.value);
    const changeSupervisorPhone = (e) => setSupervisorPhone(e.target.value);
    const changeSupervisorPassword = (e) => setSupervisorPassword(e.target.value);
    const changeSupervisorConfirmPassword = (e) => setSupervisorConfirmPassword(e.target.value);

    const onChangeSupervisorArray = [changeSupervisorName, changeSupervisorLastname, changeSupervisorCompany, changeSupervisorPosition, changeSupervisorEmail, changeSupervisorPhone, changeSupervisorPassword, changeSupervisorConfirmPassword];
    const formLabelsSupervisor = ['Vārds:', 'Uzvārds:', 'Uzņēmuma nosaukums:', 'Amats:', 'E-pasts:', 'Tālrunis:', 'Parole:', 'Apstiprināt paroli:'];
    const formNamesSupervisor = ['name', 'lastname', 'companyName', 'position', 'email', 'phone', 'password', 'confirmPassword'];
    const formTypesSupervisor = ['text', 'text', 'text', 'text', 'email', 'text', 'password', 'password'];

    return (
        <div>
            <Navbar page="register" />
            <div className="container registration">
                <h2>Reģistrācija</h2>
                <Roles 
                    handleStudent={handleStudent} 
                    handleTeacher={handleTeacher} 
                    handleSupervisor={handleSupervisor} 
                    activeStudent={activeStudent} 
                    activeTeacher={activeTeacher} 
                    activeSupervisor={activeSupervisor}
                />
                {activeStudent && <RegistrationForm 
                    id={formNames} 
                    name={formNames}
                    label={formLabels}
                    type={formTypes}
                    onChange={onChangeArray}
                    buttonText="Reģistrēties kā students"
                />}
                {activeTeacher && <RegistrationForm 
                    id={formNames} 
                    name={formNames}
                    label={formLabels}
                    type={formTypes}
                    onChange={onChangeArray}
                    buttonText="Reģistrēties kā skolotājs"
                />}
                {activeSupervisor && <RegistrationForm 
                    id={formNamesSupervisor} 
                    name={formNamesSupervisor}
                    label={formLabelsSupervisor}
                    type={formTypesSupervisor}
                    onChange={onChangeSupervisorArray}
                    buttonText="Reģistrēties kā prakses vadītājs"
                />}
            </div>
        </div>
    );
}
 
export default Register;