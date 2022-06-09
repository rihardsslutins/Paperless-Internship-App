//style
import "./Table.css";

import { useNavigate } from "react-router-dom";

const StudentsJournalTable = ({
    headerCells,
    data,
    link
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
                    {data.map(record => (
                        <tr onClick={() => navigate(link + record._id)}>
                            <td>{record.name}</td>
                            <td>{record.surname}</td>
                            <td>{record.phone}</td>
                            <td>{record.email}</td>
                        </tr>
                    ))}
                    {!data.length &&
                        <tr>
                            <td colSpan={4} className="no-record"> Nav nevina ieraksta </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
         
export default StudentsJournalTable;