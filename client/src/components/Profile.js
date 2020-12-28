import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import API from "../api";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loggedIn] = useState(jwt_decode(localStorage.getItem("accessToken")));
  const buttonRef = useRef();
  const formRef = useRef();
  useEffect(() => {
    if (loggedIn) {
      API.get(`/users/${loggedIn.id}`)
        .then((res) => {
          setUser(res.data[0]);
        })
        .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  const showForm = () => {
    buttonRef.current.classList.add("hidden");
    formRef.current.classList.remove("hidden");
  };

  const updateDescription = (e) => {
    e.preventDefault();
    API.put(`/users/${loggedIn.id}`, {
      description: e.target.description.value,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>{user.first_name + " " + user.last_name}</h1>
      <div>
        {user.description ? (
          user.description
        ) : (
          <>
            <button onClick={showForm} ref={buttonRef} className="">
              Set Description
            </button>
            <form ref={formRef} className="hidden" onSubmit={updateDescription}>
              <input
                type="text"
                name="description"
                placeholder="Add Description..."
              />
              <input type="submit" value="Set Description" />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
