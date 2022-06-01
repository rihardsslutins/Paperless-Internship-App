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
    handleClose,
    companyName
}) => {
    const theme = useTheme();
    const [alert, setAlert] = useState('');
    const [companyNameCheck, setCompanyNameCheck] = useState('');

    const handleEndJournal = () => {
        if (companyName === companyNameCheck) {
            console.log('Change active to false');
            handleModel();
        } else {
            setAlert('Nosaukumi nesakrīt!');
        }
    }
    const handleAlertClose = () => {
        setAlert('');
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
                            <LabeledInput
                                id='companyName'
                                name='companyName'
                                label='Ievadiet uzņēmuma nosaukumu, lai noslēgtu praksi:'
                                type='text'
                                onChange={e => setCompanyNameCheck(e.target.value)}
                            />
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