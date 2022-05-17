// style
import "./Cards.css";
// atoms
import PageButton from "../../atoms/button/PageButton";

import { Link } from "react-router-dom";

const JournalCard = ({
    journalCard,
    role
}) => {
    return (
        <div className="journal-card">
                <h4 className="journal-card-company">{journalCard.companyName}</h4>
                <p className="journal-card-mentor">{journalCard.mentor}</p>
                <div className="journal-card-teacher">
                    <p>Skolotājs:</p>
                    <p>{journalCard.overseeingTeacher}</p>
                </div>
                <div className="journal-card-date">
                    <p>Datums:</p>
                    <p>{journalCard.date}</p>
                </div>
                {role === 'student' ?
                    <Link to={`../student-journal/${journalCard.id}`}><PageButton text="Apskatīt" /></Link>
                :
                    <Link to={`../teacher-student-journal/${journalCard.id}`}><PageButton text="Apskatīt" /></Link>
                }
        </div>
    );
}
 
export default JournalCard;