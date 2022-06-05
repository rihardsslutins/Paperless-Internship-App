// style
import "./Cards.css";
// atoms
import PageButton from "../../atoms/button/PageButton";

import { Link } from "react-router-dom";
// hooks
import useTheme from "../../../hooks/useTheme";

const JournalCard = ({ journalCard, role }) => {
    const theme = useTheme();
    const capitaliseName = (string) => {
        string = string.split(' ')
        let capitalisedString = []
        string.forEach(element => capitalisedString.push(element.charAt(0).toUpperCase() + element.slice(1)))
        return capitalisedString.join(' ')
    }
    return (
        <div className={`journal-card ${theme}`}>
                <h4 className="journal-card-company">{journalCard.company}</h4>
                <p className="journal-card-mentor">{capitaliseName(journalCard.supervisor)}</p>
                <div className="journal-card-teacher">
                    <p>Skolotājs:</p>
                    <p>{capitaliseName(journalCard.teacher)}</p>
                </div>
                <div className="journal-card-date">
                    <p>Datums:</p>
                    <p>{journalCard.startingDate}</p>
                </div>
                {role === 'student' ?
                    <Link to={`../student-journal/${journalCard._id}`}><PageButton text="Apskatīt" /></Link>
                :
                    <Link to={`../teacher-student-journal/${journalCard._id}`}><PageButton text="Apskatīt" /></Link>
                }
        </div>
    );
}
 
export default JournalCard;