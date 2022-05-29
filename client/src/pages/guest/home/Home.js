import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { connect } from 'react-redux';

//atoms
import PageButton from '../../../components/atoms/button/PageButton';
//organisms
import Navbar from '../../../components/organisms/navbar/Navbar';
import RegisterModal from '../../../components/organisms/modal/RegisterModal';
//image
import homePage from '../../../assets/homePage.png';
//style
import './Home.css';

const Home = (props) => {
    const navigate = useNavigate();
    const [displayStudent, setDisplayStudent] = useState(false);
    const [displayTeacher, setDisplayTeacher] = useState(false);
    const [displayMentor, setDisplayMentor] = useState(false);

    const handleClose = () => {
        setDisplayStudent(false);
        setDisplayTeacher(false);
        setDisplayMentor(false);
    };
    useEffect(() => {
        if (props.user.role) {
            navigate(`${props.user.role}-home`);
        }
    }, [props.user.role]);
    return (
        <div>
            <Navbar />
            <div className="container guest-home">
                <div>
                    <h1>Kas Jūs esat?</h1>
                    <div className="home-button-grid">
                        <PageButton
                            text="Students"
                            onClick={() => {
                                setDisplayStudent(true);
                                setDisplayTeacher(false);
                                setDisplayMentor(false);
                            }}
                        />
                        <PageButton
                            text="Skolotājs"
                            onClick={() => {
                                setDisplayStudent(false);
                                setDisplayTeacher(true);
                                setDisplayMentor(false);
                            }}
                        />
                        <PageButton
                            text="Prakses vadītājs"
                            onClick={() => {
                                setDisplayStudent(false);
                                setDisplayTeacher(false);
                                setDisplayMentor(true);
                            }}
                        />
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur.
                    </p>
                </div>
                <img
                    src={homePage}
                    alt="home page"
                    className="guest-home-image"
                />
                <RegisterModal
                    title="Students"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                    display={displayStudent}
                    handleClose={handleClose}
                    buttonText="Reģistrēties kā students"
                    role="student"
                />
                <RegisterModal
                    title="Skolotājs"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                    display={displayTeacher}
                    handleClose={handleClose}
                    buttonText="Reģistrēties kā skolotājs"
                    role="teacher"
                />
                <RegisterModal
                    title="Prakses vadītājs"
                    body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                    display={displayMentor}
                    handleClose={handleClose}
                    buttonText="Reģistrēties kā prakses vadītājs"
                    role="supervisor"
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(Home);
