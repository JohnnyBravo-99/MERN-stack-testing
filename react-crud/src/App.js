import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from "react";
import Register from "./components/user_system/registration.js";
import './App.css';
import './styles/calendar-test.css';
import AddTutorial from "./components/add-tutorial.component.js";
import Tutorial from "./components/tutorial.component.js";
import TutorialsList from "./components/tutorials-list.component.js";
import CalendarTest from "./components/Calendar.js";
import Login from './components/user_system/login.js';
import { AuthProvider, AuthContext } from './components/user_system/authContext.js';

function App() {
    return (
        <AuthProvider>
            <div>
                <nav className="navbar navbar-expand-lg navbar-expand-md navbar-dark bg-dark">
                    <div className="container-fluid d-flex justify-content-center">
                        <a href="/tutorials" className="navbar-brand position-absolute start-0 mx-2">
                            Paradigm
                        </a>
                        <div className="navbar-nav-container">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={"/tutorials"} className="nav-link">
                                        Tutorials
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/add"} className="nav-link">
                                        Add
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/calendar"} className="nav-link">
                                        Schedule
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container-fluid mt-5">
                    <Routes>
                        <Route path="/" element={<TutorialsList />} />
                        <Route path="/tutorials" element={<TutorialsList />} />
                        <Route path="/add" element={<AddTutorial />} />
                        <Route path="/tutorials/:id" element={<Tutorial />} />
                        <Route path="/calendar" element={<ProtectedRoute component={CalendarTest} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </div>
        </AuthProvider>
    );
}

const ProtectedRoute = ({ component: Component }) => {
    const { user } = React.useContext(AuthContext);
    return user ? <Component /> : <Login />;
};

export default App;