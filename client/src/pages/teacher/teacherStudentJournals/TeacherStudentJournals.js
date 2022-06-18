// style
import "./TeacherStudentJournals.css";
// organisms
import Sidebar from "../../../components/organisms/navbar/Sidebar";
import CardGrid from "../../../components/organisms/cardGrid/CardGrid";
// react & react-router-dom
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// packages
import axios from "axios";
import Cookies from "js-cookie";

const TeacherStudentJournals = () => {

    const { id } = useParams();
    console.log(id);

    const [internships, setInternships] = useState([])

    // Sidebar properties
    const icon = ['home', 'journal', 'mail', 'invite', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'invite page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Uzaicinājumi', 'Iestatījumi', 'Palīdzība'];
    const link = ['teacher-home', 'teacher-journal', 'teacher-mail', 'teacher-invites', 'teacher-settings', 'help'];

    useEffect(() => {
        const getStudentInternships = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships/teacher/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`
                }
            })
            setInternships(response.data.internships)
            console.log(response.data)
        }
        getStudentInternships()
    }, [])
    // Get all journals that match users id
    // const internships = [
    //     {
    //         _id: "629ca20732f14b1ed712cf4e",
    //         isActive: true,
    //         company: "Test",
    //         supervisor: "robertstarhanovs@gmail.com",
    //         teacher: "elinadevita@gmail.com",
    //         student: "ulvisc3@gmail.com",
    //         startingDate: "2022-06-05",
    //         journal: [
    //             {      
    //                 date: "2022-06-05",
    //                 taskDescription: "Izveidoju navbar",
    //                 hoursSpent: 8,
    //                 _id: "629ca24632f14b1ed712cf58"    
    //             },
    //             {      
    //                 date: "2022-06-05",      
    //                 taskDescription: "Izveidoju galveno lapu",      
    //                 hoursSpent: 8,      
    //                 _id: "629ca26b32f14b1ed712cf5a"    
    //             },    
    //             {      
    //                 date: "2022-06-06",      
    //                 taskDescription: "Rakstiju prakses atskaiti",      
    //                 hoursSpent: 8,      
    //                 _id: "629de730ef291e6e9afb87a3"   
    //             }  
    //         ]
    //     },
    //     {  
    //         _id: "629df631ef291e6e9afb9690",
    //         isActive: false,  
    //         company: "Test2",  
    //         supervisor: "robertstarhanovs@gmail.com",  
    //         teacher: "elinadevita@gmail.com",  
    //         student: "ulvisc3@gmail.com",  
    //         startingDate: "2022-06-30",  
    //         journal: [],
    //     }
    // ]

    return (
        <div>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="teacher-journal" />
            <div className="dashboard-container">
                <div className="teacher-students-journal">
                    <h1>Dienasgrāmata - {id}</h1>
                    {internships && <CardGrid internships={internships} role="teacher" />}
                </div>
            </div>
        </div>
    );
}

export default TeacherStudentJournals;