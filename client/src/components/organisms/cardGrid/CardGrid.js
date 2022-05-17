// style
import "./CardGrid.css";
// molecules
import JournalCard from "../../molecules/card/JournalCard";

const CardGrid = ({
    internships,
    role
}) => {
    return (
        <div>
            <div className="journals-active">
                <h2>Aktīvs</h2>
                <div className="journals-grid">
                    {internships.map((internship) => (
                        internship.active && <JournalCard journalCard={internship} key={internship.id} role={role}  />
                    ))}
                </div>
            </div>
            <div className="journals-finished">
                <h2>Pabeigts</h2>
                <div className="journals-grid">
                    {internships.map((internship) => (
                        !internship.active && <JournalCard journalCard={internship} key={internship.id} role={role} />
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default CardGrid;