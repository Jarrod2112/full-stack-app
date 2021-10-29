import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'
import { FriendRequestsResources } from '../resources/friend-requests';

export const PendingFriendRequests = () => {
    const [friendRequests, setFriendRequests] = useState([]);
    const loadRequests = () => {
        FriendRequestsResources.fetchAll().then(setFriendRequests);
    };
    useEffect(() => {
        loadRequests();
    }, []);

    function handleConfirmClick(friendRequestId) {
        FriendRequestsResources.accept(friendRequestId).then(loadRequests);
    }
    function handleDeleteClick(friendRequestId) {
        FriendRequestsResources.reject(friendRequestId).then(loadRequests);
    }

    return <div className="container">
        <div className="row">
            <div className="col-6">
                <ul className="list-group">
                    {friendRequests.map(result => <li className="list-group-item d-flex justify-content-between">
                        {result.fromUsername}
                        <div className="btn-group">
                            <button className="btn btn-primary" onClick={() => handleConfirmClick(result._id)}>Confirm</button>
                            <button className="btn btn-secondary" onClick={() => handleDeleteClick(result._id)}>Delete</button>
                        </div>
                    </li>)}
                </ul>
            </div>
        </div>
    </div>
};