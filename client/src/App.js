import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// redux
import { useDispatch, connect } from 'react-redux';
import { setUser } from './reduxSlices/userSlice';

// packages
import axios from 'axios';
import Cookies from 'js-cookie';

//pages
import Home from './pages/guest/home/Home';
import Login from './pages/guest/login/Login';
import Register from './pages/guest/register/Register';
import StudentHome from './pages/student/studentHome/StudentHome';
import StudentJournals from './pages/student/studentJournals/StudentJournals';
import StudentJournal from './pages/student/studentJournal/StudentJournal';
import StudentJournalCreate from './pages/student/studentJournalCreate/StudentJournalCreate';
import TeacherHome from './pages/teacher/teacherHome/TeacherHome';
import TeacherJournal from './pages/teacher/teacherJournal/TeacherJournal';
import TeacherStudentJournals from './pages/teacher/teacherStudentJournals/TeacherStudentJournals';
import TeacherStudentJournal from './pages/teacher/teacherStudentJournal/TeacherStudentJournal';
import SupervisorHome from './pages/supervisor/supervisorHome/SupervisorHome';
import TeacherInvites from './pages/teacher/teacherInvites/TeacherInvites';
import SupervisorJournal from './pages/supervisor/supervisorJournal/SupervisorJournal';
import SupervisorStudentJournal from './pages/supervisor/supervisorStudentJournal/SupervisorStudentJournal';

function App(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        const getUser = async () => {
            if (props.user._id === '') {
                await axios
                    .get(`${process.env.REACT_APP_SERVER_URL}/me`, {
                        headers: {
                            Authorization: `Bearer ${Cookies.get('auth')}`,
                        },
                    })
                    .then((res) => res.data)
                    .then((res) =>
                        dispatch(
                            setUser({
                                _id: res._id,
                                name: res.name,
                                surname: res.surname,
                                school: res.school,
                                gender: res.gender,
                                field: res.field,
                                company: res.company,
                                phone: res.phone,
                                email: res.email,
                                password: res.password,
                                internships: res.internships,
                                role: res.role,
                            })
                        )
                    );
            }
        };
        getUser();
    }, [dispatch, props.user._id]);
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/student-home" element={<StudentHome />} />
                    <Route
                        path="/student-journals"
                        element={<StudentJournals />}
                    />
                    <Route
                        path="/student-journal/:id"
                        element={<StudentJournal />}
                    />
                    <Route
                        path="/student-journal-create"
                        element={<StudentJournalCreate />}
                    />
                    <Route path="/teacher-home" element={<TeacherHome />} />
                    <Route
                        path="/teacher-journal"
                        element={<TeacherJournal />}
                    />
                    <Route
                        path="/teacher-student-journals/:id"
                        element={<TeacherStudentJournals />}
                    />
                    <Route
                        path="/teacher-student-journal/:id"
                        element={<TeacherStudentJournal />}
                    />
                    <Route
                        path="/teacher-invites"
                        element={<TeacherInvites />}
                    />
                    <Route
                        path="/supervisor-home"
                        element={<SupervisorHome />}
                    />
                    <Route
                        path="/supervisor-journal"
                        element={<SupervisorJournal />}
                    />
                    <Route
                        path="/supervisor-student-journal/:id"
                        element={<SupervisorStudentJournal />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(App);
