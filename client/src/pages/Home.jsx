import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import PageTitle from "../components/PageTitle";
import "../css/homeStyles.css/HomeStyles.css";

export default function Home() {
    return (
        <div className="home">
            <PageTitle title="UniGo" />
            <section id="main-section">
                <h2 id="main-section-title">Welcome to UniGo</h2>
                <p id="main-section-description">The best place to connect with your education.</p>
                <button id="main-section-button" className="button" type="button">Get Started</button>
            </section>
            <section id="subjects-section">
                
            </section>
        </div>
    );
};