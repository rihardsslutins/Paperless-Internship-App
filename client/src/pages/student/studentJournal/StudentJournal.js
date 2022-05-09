// style
import "./StudentJournal.css";
// atoms
import PageButton2 from "../../../components/atoms/button/PageButton2";
import PageButton from "../../../components/atoms/button/PageButton";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import { Link } from "react-router-dom";

const StudentJournal = () => {

    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journal', 'student-mail', 'student-settings', 'help'];

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-journal" />
            <div className="dashboard-container">
                <div className="student-journal-header">
                    <h1>Dienasgrāmatas</h1>
                    <Link to="../student-journal-create"><PageButton2 text="Izveidot jaunu" active=""/></Link>
                </div>
                <div className="student-journal-active">
                    <h2>Aktīvs</h2>
                    <div className="journal-grid">
                        <div className="journal-card">
                            <h4 className="journal-card-company">Accenture</h4>
                            <p className="journal-card-mentor">Roberts Tarhanovs</p>
                            <div className="journal-card-teacher">
                                <p>Skolotājs:</p>
                                <p>Elīna Dēvita</p>
                            </div>
                            <div className="journal-card-date">
                                <p>Datums:</p>
                                <p>11.11.1111</p>
                            </div>
                            <PageButton text="Apskatīt" />
                        </div>
                    </div>
                </div>
                <div className="student-journal-finished">
                    <h2>Pabeigts</h2>
                    <div className="journal-grid">
                        <div className="journal-card">
                            <h4 className="journal-card-company">Brocēnu novada dome</h4>
                            <p className="journal-card-mentor">Prakses vadītājs</p>
                            <div className="journal-card-teacher">
                                <p>Skolotājs:</p>
                                <p>Elīna Dēvita</p>
                            </div>
                            <div className="journal-card-date">
                                <p>Datums:</p>
                                <p>22.22.2222 - 33.33.3333</p>
                            </div>
                            <PageButton text="Apskatīt" />
                        </div>
                        <div className="journal-card">
                            <h4 className="journal-card-company">Brocēnu novada dome</h4>
                            <p className="journal-card-mentor">Prakses vadītājs</p>
                            <div className="journal-card-teacher">
                                <p>Skolotājs:</p>
                                <p>Elīna Dēvita</p>
                            </div>
                            <div className="journal-card-date">
                                <p>Datums:</p>
                                <p>22.22.2222 - 33.33.3333</p>
                            </div>
                            <PageButton text="Apskatīt" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default StudentJournal;