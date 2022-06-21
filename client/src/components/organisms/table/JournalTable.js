//style
import "./Table.css";
// hooks
const JournalTable = ({
    headerCells,
    data,
    setEditGrade,
    setEditRecord,
    setAlert,
    setAlertType,
    role
}) => {

    const handleEditGrade = (record) => {
        setEditGrade([record._id, record.date, record.grade])
        setAlert('');
    }

    const handleEditRecord = (record) => {
        if (record.grade) {
            setAlertType('warning');
            setAlert('Nevar labot ierakstus kuriem jau ir ielikta atzīme!');
            setEditRecord('');
        } else {
            setAlertType('');
            setAlert('');
            setEditRecord({ _id: record._id, date: record.date, hoursSpent: record.hoursSpent, taskDescription: record.taskDescription});
        }
    }

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
                        <tr key={record._id} onClick={() => {
                            if (role === "supervisor") {handleEditGrade(record)}
                            if (role === "student") {handleEditRecord(record)}
                        }}>
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