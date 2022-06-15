// style
import "./StudentHome.css";
// assets
import male from "../../../assets/male.svg";
import female from "../../../assets/female.svg";
// atoms
import ClockAndDate from "../../../components/atoms/clockAndDate/ClockAndDate";
import NameDay from "../../../components/atoms/nameDay/NameDay";
// organism
import Sidebar from "../../../components/organisms/navbar/Sidebar";

// hooks
import useTheme from "../../../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ThemeToggleRound from "../../../components/ThemeToggle/ThemeToggleRound";

const StudentHome = () => {

    const theme = useTheme();

    // Sidebar
    const icon = ['home', 'journal', 'mail', 'settings', 'help'];
    const imgAlt = ['home page', 'journal page', 'mail page', 'settings page', 'help page'];
    const title = ['Sākums', 'Dienasgrāmata', 'Vēstules', 'Iestatījumi', 'Palīdzība'];
    const link = ['student-home', 'student-journals', 'student-mail', 'student-settings', 'help'];

    const navigate = useNavigate();
    
    // Logged in users info
    const student = { 
        id: '6283abad20a71c3f8b4a2e07',
        name: "Ulvis",
        surname: "Čakstiņš",
        school: "Saldus tehnikums",
        phone: 25412514,
        gender: "male",
        email: "ulvisc3@gmail.com",
        password: "parole123",
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

    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://srv2.weatherwidget.org/js/?id=ww_4fa87b484304c";
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
      }, []);

    return (
        <>
            <Sidebar icon={icon} imgAlt={imgAlt} title={title} link={link} page="student-home" />
            <div className="dashboard-container">
                <div className="student-home">
                    <div className="home-nameday-date">
                        <NameDay />
                        <ClockAndDate displayClock={true} displayTodaysDate={true} />
                    </div>
                    <div className={`home-profile ${theme}`} onClick={() => navigate("../student-settings")}>
                        <img className="home-profile-image" src={student.gender === "male" ? male : female} alt="profile" />
                        <h1>{student.name} {student.surname}</h1>
                        <div className="home-profile-contact-info">
                            <h3>E-pasts: {student.email}</h3>
                            <h3>Tālrunis: {student.phone}</h3>
                            <h3>Skola: {student.school}</h3>
                        </div>
                    </div>
                    <div className="weather-container">
                        {theme === 'dark' ?
                            <div className="weather-widget" id="ww_4fa87b484304c" v='1.20' loc='auto' a='{"t":"horizontal","lang":"lv","ids":[],"cl_bkg":"#2b2b2b","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","sl_sot":"celsius","sl_ics":"one_a","font":"Arial"}'>
                                Weather Data Source: <a href="https://sharpweather.com/" id="ww_4fa87b484304c_u" target="_blank">
                                    Sharp Weather
                                </a>
                            </div>
                        :
                            <div className="weather-widget" id="ww_4fa87b484304c" v='1.20' loc='auto' a='{"t":"horizontal","lang":"lv","ids":[],"cl_bkg":"#FFFFFF","cl_font":"#333333","cl_cloud":"#d4d4d4","cl_persp":"#2196F3","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","sl_sot":"celsius","sl_ics":"one_a","font":"Arial"}'>
                                Weather Data Source: <a href="https://sharpweather.com/" id="ww_4fa87b484304c_u" target="_blank">
                                    Sharp Weather
                                </a>
                            </div>
                        }
                    </div>
                    <div className="theme-toggle-sticky">
                        <ThemeToggleRound />
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentHome;