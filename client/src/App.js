import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

//pages
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import StudentHome from './pages/studentHome/StudentHome';
import SupervisorHome from './pages/supervisorHome/SupervisorHome';
import TeacherHome from './pages/teacherHome/TeacherHome';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/student-home" element={<StudentHome />} />
                    <Route path="/teacher-home" element={<TeacherHome />} />
                    <Route path="/supervisor-home" element={<SupervisorHome />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
