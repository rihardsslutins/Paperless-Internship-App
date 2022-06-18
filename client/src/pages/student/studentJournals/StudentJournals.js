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

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    const [internships, setInternships] = useState('')
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        setIsPending(true);
        const getInternships = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/internships`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                },
            });
            setInternships(response.data.internships)
            console.log(internships)
            setIsPending(false);
        }
        getInternships()
    }, [])

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
                {isPending && <div className="loading"></div>}
                {!isPending && 
                    <CardGrid internships={internships} role="student" />
                }
            </div>
        </>
    );
};

export default StudentJournals;
