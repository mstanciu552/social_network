import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ id }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3030/users/${id}`)
      .then((res) => {
        setUser(res.data[0]);
      })
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <div>
      <h1>{user.first_name + " " + user.last_name}</h1>
      <p>{user.description !== "" ? user.description : undefined}</p>
    </div>
  );
};

export default Profile;
