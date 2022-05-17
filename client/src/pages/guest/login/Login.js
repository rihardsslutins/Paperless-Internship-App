import axios from 'axios';
import { useState } from 'react';

//style
import "./Login.css";

//organisms
import LoginForm from '../../../components/organisms/form/LoginForm';
import Navbar from "../../../components/organisms/navbar/Navbar";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeUsername = (e) => setUsername(e.target.value);
    const changePassword = (e) => setPassword(e.target.value);

    const onChangeArray = [changeUsername, changePassword];

    const createUser = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:3000/users`, {
                username,
                password,
            })
            .then(console.log('hit'))
            .catch((err) => console.log(err));
    };
    const formLabels = ['E-pasts:', 'Parole:'];
    const formNames = ['username', 'password'];
    const formTypes = ['email', 'password'];
    return (
        <div>
            <Navbar page="login" />
            <div className="container">
                <h2 className="login-title">Pieslēgties</h2>
                <LoginForm
                    id={formNames}
                    name={formNames}
                    label={formLabels}
                    type={formTypes}
                    onClick={(e) => createUser(e)}
                    onChange={onChangeArray}
                    buttonText="Pieslēgties"
                />
            </div>
        </div>
    );
}
 
export default Login;