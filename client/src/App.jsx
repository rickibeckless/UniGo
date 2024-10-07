import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import { Outlet } from "react-router-dom";
import './App.css';

function App() {

    return (
        <div className="App">
            <header className="App-header">
                <nav id="main-nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default App;