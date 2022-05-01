// style
import "./Roles.css";
// atoms
import PageButton2 from "../../atoms/button/PageButton2";

const Roles = ({
    handleStudent,
    handleTeacher,
    handleSupervisor,
    activeStudent,
    activeTeacher,
    activeSupervisor
}) => {
    
    return (
        <div className="roles">
            <p>Jūsu loma</p>
            <div className="roles-grid">
                <PageButton2 text="Students" onClick={handleStudent} active={activeStudent} />
                <PageButton2 text="Skolotājs" onClick={handleTeacher} active={activeTeacher} />
                <PageButton2 text="Prakses vadītājs" onClick={handleSupervisor} active={activeSupervisor} />
            </div>
        </div>
    );
}
 
export default Roles;