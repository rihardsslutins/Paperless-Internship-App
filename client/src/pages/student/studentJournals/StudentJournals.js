// style
import './StudentJournals.css';

// redux
import { connect } from 'react-redux';

// atoms
import PageButton2 from '../../../components/atoms/button/PageButton2';
// organisms
import Sidebar from '../../../components/organisms/navbar/Sidebar';
import CardGrid from '../../../components/organisms/cardGrid/CardGrid';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const StudentJournals = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!props.user.role) {
            navigate(`../login`)
        }
        if (!props.user.role === 'student') {
            navigate(`../${props.user.role}-home`)
        }
    })

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = [
        'home page',
        'journal page',
        'mail page',
        'settings page',
        'help page',
    ];
    const title = [
        'Sākums',
        'Dienasgrāmata',
        'Vēstules',
        'Iestatījumi',
        'Palīdzība',
    ];
    const link = [
        'student-home',
        'student-journals',
        'student-mail',
        'student-settings',
        'help',
    ];

    // Journal Card
    const internships = [
        {
            id: '31928h312312ui3adww',
            active: true,
            companyName: 'Accenture',
            overseeingTeacher: 'Elīna Dēvita',
            mentor: 'Roberts Tarhanovs',
            date: '01.03.2022.',
        },
        {
            id: 'du12bi1v23v1y2v3i1v2',
            active: false,
            companyName: 'Brocēnu novada dome',
            overseeingTeacher: 'Elīna Dēvita',
            mentor: 'Jānis Bērziņš',
            date: '07.11.2021.',
        },
        {
            id: '31298b9be201xnxe9u2b',
            active: false,
            companyName: 'Brocēnu novada dome',
            overseeingTeacher: 'Elīna Dēvita',
            mentor: 'Jānis Bērziņš',
            date: '03.02.2021.',
        },
    ];
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

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(StudentJournals);
