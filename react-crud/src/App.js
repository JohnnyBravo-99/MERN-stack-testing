import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.mis.css";
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
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
                        <Route path="/tutorials/:id" element={<Tutorial />}/>
                    </Routes>
                </div>


            </div>

        );
    }
}



export default App;
