import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//pages
import Home from './pages/guest/home/Home';
import Login from './pages/guest/login/Login';
import Register from './pages/guest/register/Register';
import StudentHome from './pages/student/studentHome/StudentHome';
import StudentJournal from './pages/student/studentJournal/StudentJournal';
import StudentJournalCreate from './pages/student/studentJournalCreate/StudentJournalCreate';
import SupervisorHome from './pages/supervisor/supervisorHome/SupervisorHome';
import TeacherHome from './pages/teacher/teacherHome/TeacherHome';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/student-home" element={<StudentHome />} />
                    <Route path="/student-journal" element={<StudentJournal />} />
                    <Route path="/student-journal-create" element={<StudentJournalCreate />} />
                    <Route path="/teacher-home" element={<TeacherHome />} />
                    <Route path="/supervisor-home" element={<SupervisorHome />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
