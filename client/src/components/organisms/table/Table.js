//style
import { useNavigate } from "react-router-dom";
import "./Table.css";

const Table = ({
    headerCells,
    data,
    link,
    handleEdit
}) => {

    const navigate = useNavigate();

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {headerCells.map((headerCell) => (
                            <th key={headerCell}>{headerCell}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(records => (
                        <>
                        {/* Table for teachers to display students */}
                        {records.studentId &&   
                            <tr onClick={() => navigate(link + records.studentId)}>
                                {Object.values(records).map(record =>
                                    <td>{record}</td>
                                )}
                            </tr>
                        }
                        {/* Table for supervisors to display students */}
                        {records.journalId &&
                            <tr onClick={() => navigate(link + records.journalId)}>
                            {Object.values(records).map(record =>
                                <td>{record}</td>
                            )}
                        </tr>
                        }
                        {/* Table to display journal records */}
                        {records.recordId &&
                            <tr onClick={handleEdit}>
                                {Object.values(records).map(record => 
                                    <td>{record}</td>
                                )}
                            </tr>
                        }
                        </>
                    ))}
                    {!data.length &&
                        <tr>
                            <td colSpan={4}>
                                Nav nevina ieraksta
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
 
export default Table;