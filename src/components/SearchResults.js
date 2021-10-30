import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useState } from 'react/cjs/react.development';
import { FriendRequestsResources } from '../resources/friend-requests';
import userResources from '../resources/users';

const SearchResultItem = (props) => {
    const [result, setResult] = useState(props.result);
    function handleAddFriendClick(toUserId) {
        FriendRequestsResources.create(toUserId).then(() => {
            setResult({ ...result, isRequested: true });
        })
    }

    // This is gross sorry
    const button = result.isSelf
        ? null
        : result.isRequested
            ? <button className="btn btn-primary" disabled>Requested</button>
            : result.isFriend
                ? <button className="btn btn-success">Friends</button>
                : <button className="btn btn-primary" onClick={() => handleAddFriendClick(result._id)}>Add friend</button>
    return <li className="list-group-item d-flex justify-content-between">{result.username} {button}</li>
}

export const SearchResults = () => {
    const { searchTerm } = useParams();
    const [results, setResults] = useState([])
    useEffect(() => {
        if (searchTerm) {
            userResources.search(searchTerm).then(setResults);
        }
    }, [searchTerm]);

    return <div className="container">
        <div className="row">
            <div className="col-6">
                <ul className="list-group">
                    {results.map(result => <SearchResultItem result={result} />)}
                </ul>
            </div>
        </div>
    </div>
}