//style
import "./Table.css";
// hooks
import { useLocation } from "react-router-dom";
const JournalTable = ({
    headerCells,
    data,
    setEditRecord
}) => {
    const location = useLocation();
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        {headerCells.map((headerCell) => (
                            <th key={headerCell}>{headerCell}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(record => (
                        <tr onClick={(
                            location.pathname.split("/")[1] === 'supervisor-student-journal' ?
                                () => setEditRecord([record._id, record.date, record.grade])
                            :
                                undefined
                            )}>
                            <td className="date">{record.date}</td>
                            <td className="task-description">{record.taskDescription}</td>
                            <td>{record.hoursSpent}</td>
                            <td>{record.grade}</td>
                        </tr>
                    ))}
                    {!data.length &&
                        <tr>
                            <td colSpan={4} className="no-record"> Nav neviena ieraksta </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
 
export default JournalTable;