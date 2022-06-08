// style
import './StudentJournals.css';
// atoms
import PageButton2 from '../../../components/atoms/button/PageButton2';
// organisms
import Sidebar from '../../../components/organisms/navbar/Sidebar';
import CardGrid from '../../../components/organisms/cardGrid/CardGrid';
// packages
import axios from 'axios';
import Cookies from 'js-cookie';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentJournals = () => {

    const [internships, setInternships] = useState('')

    useEffect(() => {
        const getInternships = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                },
            });
            setInternships(response.data.internships)
            console.log(internships)
        }

        getInternships()
    }, [])

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    // Journal Card
    // const internships = [
    //     {
    //         id: '31928h312312ui3adww',
    //         active: true,
    //         companyName: 'Accenture',
    //         overseeingTeacher: 'Elīna Dēvita',
    //         mentor: 'Roberts Tarhanovs',
    //         date: '01.03.2022.',
    //     },
    //     {
    //         id: 'du12bi1v23v1y2v3i1v2',
    //         active: false,
    //         companyName: 'Brocēnu novada dome',
    //         overseeingTeacher: 'Elīna Dēvita',
    //         mentor: 'Jānis Bērziņš',
    //         date: '07.11.2021.',
    //     },
    //     {
    //         id: '31298b9be201xnxe9u2b',
    //         active: false,
    //         companyName: 'Brocēnu novada dome',
    //         overseeingTeacher: 'Elīna Dēvita',
    //         mentor: 'Jānis Bērziņš',
    //         date: '03.02.2021.',
    //     },
    // ];
    return (
        <>
            <Sidebar
                icon={icon}
                imgAlt={imgAlt}
                title={title}
                link={link}
                page="student-journals"
            />
            <div className="dashboard-container">
                <div className="student-journals-header">
                    <h1>Dienasgrāmatas</h1>
                    <Link to="../student-journal-create">
                        <PageButton2 text="Izveidot jaunu" active="" />
                    </Link>
                </div>
                <CardGrid internships={internships} role="student" />
            </div>
        </>
    );
};

export default StudentJournals;
