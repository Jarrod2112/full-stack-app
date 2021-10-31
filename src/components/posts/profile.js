import { use } from 'passport';
import { React, useEffect, useState } from 'react';
import userResources from '../../resources/users';

export const Profile = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  async function handleClick() {
    await userResources.saveProfile(firstName, lastName, phoneNumber, email, birthday);
  }

  useEffect(() => {
    
  })

  return (
    <div>
      <div>
        <h6>First Name</h6>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <h6>Last Name</h6>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
        />
        <h6>Phone Number</h6>
        <input
          type="text"
          onChange={(e) => setPhonenumber(e.target.value)}
        />
        <h6>E-mail</h6>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <h6>Birthday</h6>
        <input
          type="text"
          onChange={(e) => setBirthday(e.target.value)}
        />
        <button onClick={handleClick}>Save</button>
      </div>
    </div>
  )
}