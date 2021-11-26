import { React, useEffect, useState } from 'react';
import userResources from '../../resources/users';
import {PacmanLoader} from 'react-spinners';
import moment from 'moment';

export const Profile = (props) => {
  const [profile, setProfile] = useState(null);

  async function handleClick() {
    await userResources.saveProfile(profile);
  }

  async function getCurrentProfile() {
    await userResources.getProfile().then((response) => {
      setProfile(response.profile); // { profile: {...} }
    });
  }

  function setProfileField(fieldName) {
    return (event) => setProfile(profile => ({ ...profile, [fieldName]: event.target.value}));
  }

  useEffect(() => {
    getCurrentProfile();
  }, []);
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
        {
          profile ?
          <div>
            <h6>First Name</h6>
            <input
            className="form-control me-2"
            type="text"
            value={profile.firstName}
            onChange={setProfileField("firstName")}
            />
            <h6>Last Name</h6>
            <input
            className="form-control me-2"
            type="text"
            value={profile.lastName}
            onChange={setProfileField("lastName")}
            />
            <h6>Phone Number</h6>
            <input
            className="form-control me-2"
            type="text"
            value={profile.phoneNumber}
            onChange={setProfileField("phoneNumber")}
            />
            <h6>E-mail</h6>
            <input
            className="form-control me-2"
            type="text"
            value={profile.email}
            onChange={setProfileField("email")}
            />
            <h6>Birthday</h6>
            <input
            className="form-control me-2"
            type="date"
            value={moment(profile.birthday).format('YYYY-MM-DD')}
            onChange={setProfileField("birthday")}
            />
            <button
            className="btn btn-outline-success"
            onClick={handleClick}>Save</button>
          </div>
          : <div className="mt-3">< PacmanLoader /></div>
        }</div>
      </div>
    </div>
  )
}