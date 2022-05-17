import axios from 'axios';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

//style
import './Login.css';

//organisms
import LoginForm from '../../../components/organisms/form/LoginForm';
import Navbar from '../../../components/organisms/navbar/Navbar';
import Roles from '../../../components/organisms/roles/Roles';
import Alert from '../../../components/atoms/alerts/Alert';

const Login = () => {

    const [searchParams] = useSearchParams();
    const [alert, setAlert] = useState('');
    const navigate = useNavigate();

    const [studentEmail, setStudentEmail] = useState('');
    const [studentPassword, setStudentPassword] = useState('');

    const [activeStudent, setActiveStudent] = useState(
        searchParams.get('role') === 'student' ? '-active' : ''
    );
    const [activeTeacher, setActiveTeacher] = useState(
        searchParams.get('role') === 'teacher' ? '-active' : ''
    );
    const [activeSupervisor, setActiveSupervisor] = useState(
        searchParams.get('role') === 'supervisor' ? '-active' : ''
    );

    // Error handling
    const handleErrors = (errors, propertyOrder) => {
        for (let i = 0; i < propertyOrder.length; i++) {
            if (errors[propertyOrder[i]]) {
                setAlert(errors[propertyOrder[i]]);
                return;
            } else {
                setAlert('');
            }
        }
    };

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

    const changeStudentEmail = (e) => setStudentEmail(e.target.value);
    const changeStudentPassword = (e) => setStudentPassword(e.target.value);

    const onChangeArray = [changeStudentEmail, changeStudentPassword];

    const handleStudentLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/students-login`,
                {
                    email: studentEmail,
                    password: studentPassword,
                },
                {
                    withCredentials: true,
                }
            );
            navigate('/student-home');
        } catch (err) {
            const errors = err.response.data.errors;
            const propertyOrder = ['email', 'password'];
            handleErrors(errors, propertyOrder);
        }
    };

    const handleAlertClose = () => {
        setAlert('');
    };

    const handleInputReset = () => {
        // Student reset
        setStudentEmail('');
        setStudentPassword('');
        // Reset alert
        handleAlertClose();
    };

    const formLabels = ['E-pasts:', 'Parole:'];
    const formNames = ['email', 'password'];
    const formTypes = ['email', 'password'];
    return (
        <div>
            <Navbar page="login" />
            <div className="container registration">
                <h2 className="login-title">Pieslēgties</h2>
                <Roles
                    handleStudent={handleStudent}
                    handleTeacher={handleTeacher}
                    handleSupervisor={handleSupervisor}
                    handleInputReset={handleInputReset} // IMPORTANT !!!
                    activeStudent={activeStudent}
                    activeTeacher={activeTeacher}
                    activeSupervisor={activeSupervisor}
                />
                {alert && (
                    <Alert
                        type="warning"
                        text={alert}
                        handleAlertClose={handleAlertClose}
                    />
                )}
                {activeStudent && (
                    <LoginForm
                        id={formNames}
                        name={formNames}
                        label={formLabels}
                        type={formTypes}
                        onClick={handleStudentLogin}
                        onChange={onChangeArray}
                        buttonText="Pieslēgties"
                    />
                )}
            </div>
        </div>
    );
};

export default Login;
