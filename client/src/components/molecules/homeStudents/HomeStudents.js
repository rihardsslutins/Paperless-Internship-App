// style
import "./HomeStudents.css";
// assets
import noStudent from "../../../assets/noStudent.svg";
// atoms
import PageButton2 from "../../atoms/button/PageButton2";
// hooks
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";

const HomeStudents = ({
    studentList,
    role,
    isPending
}) => {

    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <div className="home-students">
            <div className={`home-student-title ${theme}`}>
                <span></span>
                <h2>Praktikanti</h2>
                <PageButton2 text='Visi praktikanti' active='' onClick={() => 
                    role === 'supervisor' ?
                        navigate("../supervisor-journal") 
                    : 
                        navigate("../teacher-journal")} 
                />
            </div>
            <div className={`home-students-list ${theme}`}>
                {isPending && 
                    <div className="student-loading-container">
                        <div className="loading"></div>
                    </div>
                }
                {!isPending &&
                    <>
                        {studentList.length ?
                            <table>
                                <tbody>
                                    {studentList.map((student) => (
                                        <tr key={student._id} className="home-student" 
                                            onClick={() => role === 'supervisor' ? 
                                                    navigate("../supervisor-student-journal/" + student._id)
                                                :
                                                    navigate("../teacher-student-journals/" + student._id)
                                            }
                                        >
                                            <td>{student.name + ' ' + student.surname}</td>
                                            <td>{student.phone}</td>
                                            <td>{student.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        :
                            <div className="home-no-students-container">
                                <div className="home-no-students">
                                    <img src={noStudent} alt="no students" />
                                    <p>Nav praktikantu</p>
                                </div>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    );
}
 
export default HomeStudents;