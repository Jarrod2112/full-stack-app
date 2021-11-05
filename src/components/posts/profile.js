import { React, useEffect, useState } from 'react';
import userResources from '../../resources/users';

export const Profile = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [profile, setProfile] = useState("");

  async function handleClick() {
    await userResources.saveProfile(firstName, lastName, phoneNumber, email, birthday);
  }

  async function getCurrentProfile() {
    await userResources.getProfile().then((response) => {
      setProfile(response);
    });
  }

  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <div class="card text-white bg-dark mb-3 d-flex">
      <div className="d-flex">
        <div>
          <div>
            <h6>First Name</h6>
            <input
              className="form-control me-2"
              type="text"
              placeholder={profile.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <h6>Last Name</h6>
            <input
              className="form-control me-2"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            <h6>Phone Number</h6>
            <input
              className="form-control me-2"
              type="text"
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <h6>E-mail</h6>
            <input
              className="form-control me-2"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <h6>Birthday</h6>
            <input
              className="form-control me-2"
              type="text"
              onChange={(e) => setBirthday(e.target.value)}
            />
            <button
              className="btn btn-outline-success"
              onClick={handleClick}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}