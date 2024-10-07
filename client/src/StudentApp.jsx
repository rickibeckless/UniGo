import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { Outlet } from "react-router-dom";
import './App.css';

function StudentApp() {

    return (
        <div className="App">
            <header id="main-header">
                <h1 id="main-logo"><a href="/">UniGo | Student</a></h1>
                <nav id="main-navbar">
                    <ul>
                        <li><a href="#">School Link</a></li>
                    </ul>
                </nav>
            </header>

            <main id="main-body" className="container">
                <Outlet />
            </main>

            <footer id="main-footer">
                <nav id="footer-navbar">
                    <ul>
                        <li><a href="#">Admin Login</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Help</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <p id="footer-cr-statement">
                    Copyright &copy; 2024 <a id="footer-cr-link" href="https://github.com/rickibeckless" target="_blank" rel="noopener nofollow noreferrer" title="Ricki Beckless GitHub">Ricki Beckless</a>. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default StudentApp;