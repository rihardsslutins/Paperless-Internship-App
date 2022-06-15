import { namedays } from "vardadienas";

const NameDay = () => {

    const today = new Date();
    const date = ('0' + (today.getMonth()+1)).slice(-2) + '-' + ('0' + (today.getDate())).slice(-2);
    const nameday = JSON.parse(JSON.stringify(namedays[date]));

    return (
        <div>
            <b>Vārda dienas:</b> {nameday.map((name, index) => `${name}${index === nameday.length - 1 ? '.' : ', '}`)}
        </div>
    );
}
 
export default NameDay;