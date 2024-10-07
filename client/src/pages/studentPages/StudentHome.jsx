import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import PageTitle from "../../components/PageTitle";
import "../../css/studentsStyles/studentsHomeStyles.css";

export default function Home() {
    return (
        <div className="home">
            <PageTitle title="Student | UniGo" />
            <section id="main-section">
                <h2 id="main-section-title"></h2>
                <p id="main-section-description"></p>
                <button id="main-section-button" className="button" type="button"></button>
            </section>
            <section id="subjects-section">
                <h2>Upcoming Assignments</h2>
                <ul id="subject-list">
                    <li id="default-li">Nothing yet! You're in the clear!</li>
                </ul>
            </section>
        </div>
    );
};