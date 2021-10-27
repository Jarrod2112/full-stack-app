import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom';
import { Profile } from './posts/profile';



export const Navigation = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Social Media</a>
                <button className="navbar-toggler" type="button"
                    onClick={() => setIsCollapsed(!isCollapsed)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"navbar-collapse" + (isCollapsed ? " collapse" : "")} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link active" aria-current="page">{props.username}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}