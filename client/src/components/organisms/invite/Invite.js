// style
import "./Invite.css";
// atoms
import DangerButton2 from "../../atoms/button/DangerButton2";
import PageButton from "../../atoms/button/PageButton";
// hooks
import useTheme from "../../../hooks/useTheme";

const Invite = ({
    invites,
    handleAccept,
    handleReject
}) => {

    const theme = useTheme();

    return (
        invites.map(invite => 
            <div className={`invite-box ${theme}`} key={invite.id}>         
                    <h2>{invite.title}</h2>
                    <p>{invite.from} no {invite.school} uzaicināja Jūs pievienoties savai deinasgrāmatai, uzņēmumā {invite.companyName}.</p>
                    <div className="invite-button-group">
                        <PageButton text="Apstiprināt" onClick={handleAccept} />
                        <DangerButton2 text="Noraidīt" onClick={handleReject} />
                    </div>
            </div>
        )
    );
}
 
export default Invite;