// style
import "./Modal.css";
// assets
import closeBlack from "../../../assets/closeBlack.svg"
// atoms
import PageButton from "../../atoms/button/PageButton";
import DangerButton from "../../atoms/button/DangerButton";
import Alert from "../../atoms/alerts/Alert";
// molecules
import LabeledInput from "../../molecules/labeledInput/InputGroup";
// hooks
import { useState } from "react";
import useTheme from "../../../hooks/useTheme";

const JournalModal = ({
    display,
    handleClose
}) => {

    const student = { 
        id: '6283abad20a71c3f8b4a2e07',
        name: "Ulvis",
        surname: "Čakstiņš",
        school: "Saldus thenikums",
        phone: 25412514,
        gender: "male",
        email: "ulvisc3@gmail.com",
        password: "password",
        teachers: [
            {
                fullName: "Elīna Dēvita",
                email: "elinadevita@gmail.com"
            },
            {
                fullName: "Mārtiņs Zīlīte",
                email: "martins@gmail.com"
            }
        ]
    }

    const theme = useTheme();

    // Alert
    const [alert, setAlert] = useState('');
    const handleAlertClose = () => {
        setAlert('');
    }
    const [passwordCheck, setPasswordCheck] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleEndJournal = () => {
        console.log('hit');
        console.log(endDate);
        setAlert('');
        if (!endDate) {
            setAlert('Ievadiet prakses beigu datumu');
        } else if (student.password !== passwordCheck) {
            setAlert('Parole nav pareiza!');
        } else {
            console.log('Change active to false');
            handleModel();
        }
    }

    const handleModel = () => {
        handleClose();
        handleAlertClose();
    }

    return (
        <>
            {display && 
                <div className="journal-modal">
                    <div className={`modal-content ${theme}`}>
                        <div className="modal-header">
                            <h2>Dienasgrāmatas noslēgšana</h2>
                            <img src={closeBlack} alt="close modal" onClick={handleModel} />
                        </div>
                        <div className="modal-body">
                            <h3>Ja noslēgsiet dienasgrāmatu, tad šajā dienasgrāmatā vairs nēbūs iespējams pievienot jaunus ierakstus, kā arī prakses vadītājs nevarēs Jums ielikt atzīmes!</h3>
                            {alert && <Alert type="warning" text={alert} handleAlertClose={handleAlertClose} />}
                            <div className="journal-modal-inputs">
                                <LabeledInput
                                    id='endDate'
                                    name='endDate'
                                    label='Prakses beigu datums:'
                                    type='date'
                                    onChange={e => setEndDate(e.target.value)}
                                />
                                <LabeledInput
                                    id='companyName'
                                    name='companyName'
                                    label='Ievadiet savu paroli, lai noslēgtu praksi:'
                                    type='password'
                                    onChange={e => setPasswordCheck(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <PageButton text="Atcelt" onClick={handleModel} />
                            <DangerButton text="Noslēgt praksi" onClick={handleEndJournal} />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
 
export default JournalModal;