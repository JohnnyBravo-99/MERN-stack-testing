import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/tutorial.service.js";
import { Link } from "react-router-dom";

const TutorialsList = () => {
    const [tutorials, setTutorials] = useState([]);
    const [currentTutorial, setCurrentTutorial] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveTutorials();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        console.log("Search title changed to:", searchTitle); // Debugging line
        setSearchTitle(searchTitle);
    };

    const retrieveTutorials = () => {
        TutorialDataService.getAll()
            .then(tutorials => {
                console.log("Response data is: ", tutorials);
                setTutorials(tutorials);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveTutorials();
        setCurrentTutorial(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (tutorial, index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };

    const removeAllTutorials = () => {
        TutorialDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        console.log("Searching for title:", searchTitle); // Debugging line
        if (!searchTitle) {
            refreshList();
            return;
        }

        TutorialDataService.findByTitle(searchTitle)
            .then(response => {
                setTutorials(response);
                console.log("Found tutorials: ", response);
            })
            .catch(e => {
                console.log(e);
                setTutorials([]);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title.."
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <h4>Tutorials List</h4>

                <ul className="list-group">
                    {tutorials.length > 0 ? (
                        tutorials.map((tutorial, index) => (
                            <li
                                className={
                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                }
                                onClick={() => setActiveTutorial(tutorial, index)}
                                key={index}
                            >
                                {tutorial.title}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item">No tutorials found.</li>
                    )}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllTutorials}
                >
                    Remove All
                </button>
            </div>

            <div className="col-md-6">
                {currentTutorial ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentTutorial.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentTutorial.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/tutorials/" + currentTutorial.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a tutorial...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorialsList;
