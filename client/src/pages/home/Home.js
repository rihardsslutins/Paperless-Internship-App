import axios from 'axios';
import { useState } from 'react';
import Form from '../../components/organisms/form/Form';
const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const changeUsername = (e) => {
        setUsername(e.target.value);
    };
    const changePassword = (e) => {
        setPassword(e.target.value);
    };

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
    const formLabels = ['Username', 'Password'];
    const formNames = ['username', 'password'];
    return (
        <div>
            <h1>{username}</h1>
            <h1>{password}</h1>
            <Form
                id={formNames}
                name={formNames}
                label={formLabels}
                onClick={(e) => createUser(e)}
                onChange={onChangeArray}
                buttonText="click me"
            />
        </div>
    );
};

export default Home;
