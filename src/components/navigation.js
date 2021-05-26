import React, { useState } from 'react';


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
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Logged in as {props.username}</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}