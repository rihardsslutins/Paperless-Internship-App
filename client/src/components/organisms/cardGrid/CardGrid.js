// style
import "./CardGrid.css";
// molecules
import JournalCard from "../../molecules/card/JournalCard";

const CardGrid = ({
    internships,
    role
}) => {
    console.log(internships);
    return (
        <div>
            <div className="journals-active">
                <h2>Aktīvs</h2>
                <div className="journals-grid">
                    {internships && internships.map((internship) => (
                        internship.isActive && <JournalCard journalCard={internship} key={internship._id} role={role}  />
                    ))}
                </div>
            </div>
            <div className="journals-finished">
                <h2>Pabeigts</h2>
                <div className="journals-grid">
                    {internships && internships.map((internship) => (
                        !internship.isActive && <JournalCard journalCard={internship} key={internship._id} role={role} />
                    ))}
                </div>
            </div>
        </div>
    );
}
 
export default CardGrid;