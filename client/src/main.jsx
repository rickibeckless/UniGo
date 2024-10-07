import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import './index.css';
import NotFound from './pages/NotFound.jsx';

// Student Pages
import StudentHome from './pages/studentPages/StudentHome.jsx';
import StudentApp from './StudentApp.jsx';
import StudentLogin from './pages/studentPages/StudentLogin.jsx';

// Educator Pages

// Admin Pages

const router = createBrowserRouter([
    { // Main Pages
        path: '/',
        element: <App />,
        children: [
            { path: '/', element: <Home /> },
            { path: '*', element: <NotFound /> },
        ],
    },
    { // Student Pages
        path: '/stu',
        element: <StudentApp />,
        children: [
            { path: '/stu', element: <StudentHome /> },
            { path: '/stu/login', element: <StudentLogin /> },
        ]
    },
    /* { // Educator Pages
        path: '/edu',
        element: <EducatorApp />,
        children: [
            { path: '/edu', element: <EducatorHome /> },
            { path: '/edu/login', element: <EducatorLogin /> },
        ]
    },
    { // Admin Pages
        path: '/admin',
        element: <AdminApp />,
        children: [
            { path: '/admin', element: <AdminHome /> },
            { path: '/admin/login', element: <AdminLogin /> },
        ]
    } */
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);