import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import AddTutorial from "./components/add-tutorial.component.js";
import Tutorial from "./components/tutorial.component.js";
import TutorialsList from "./components/tutorials-list.component.js";

function App() {

    return (

        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/tutorials" className="navbar-brand">
                    Jay Gatsby
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/tutorials"} className="nav-link">
                            Tutorials
                        </Link>
                    </li>
                    <li className="nav-item">
                        <link to={"/add"} className="nav-link">
                            Add
                        </link>
                    </li>
                </div>
            </nav>


            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<TutorialsList />} />
                    <Route path="/tutorials" element={<TutorialsList />} />
                    <Route path="/add" element={<AddTutorial />} />
                    <Route path="/tutorials/:id" element={<Tutorial />} />
                </Routes>
            </div>


        </div>

    );
};




export default App;