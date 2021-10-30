import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, NavLink, Route, useHistory } from 'react-router-dom';
import { FaUserFriends } from 'react-icons/fa';
import { FriendRequestsResources } from '../resources/friend-requests';



export const Navigation = (props) => {
    const history = useHistory();
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        FriendRequestsResources.fetchAll().then(setFriendRequests);
    }, []);
    function handleSearch() {
        history.push(`/search/${searchTerm}`);
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') { handleSearch() }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Social Media</a>
                <button className="navbar-toggler" type="button"
                    onClick={() => setIsCollapsed(!isCollapsed)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"navbar-collapse" + (isCollapsed ? " collapse" : "")} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link active">{props.username}</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/friend-requests" className="nav-link">
                                <FaUserFriends />
                                {friendRequests.length
                                    ? <span className="badge rounded-pill bg-danger">
                                        {friendRequests.length}
                                    </span>
                                    : null}
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search"
                        value={searchTerm} onChange={e => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} />
                    <button className="btn btn-outline-success" onClick={handleSearch}>Search</button>
                </div>
            </div>
        </nav>
    )
}