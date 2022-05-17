// style
import DangerButton2 from "../../atoms/button/DangerButton2";
import PageButton from "../../atoms/button/PageButton";
import "./Invite.css";

const Invite = ({
    invites,
    handleAccept,
    handleReject
}) => {
    return (
        invites.map(invite => 
            <div className="invite-box" key={invite.id}>         
                    <h2>{invite.title}</h2>
                    <p>{invite.from} uzaicināja Jūs pievienoties savai deinasgrāmatai, uzņēmumā {invite.companyName}.</p>
                    <div className="invite-button-group">
                        <PageButton text="Apstiprināt" onClick={handleAccept} />
                        <DangerButton2 text="Noraidīt" onClick={handleReject} />
                    </div>
            </div>
        )
    );
}
 
export default Invite;