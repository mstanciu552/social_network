import React, { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import API from "../api";

const Profile = () => {
  const [user, setUser] = useState({});
  const [loggedIn] = useState(jwt_decode(localStorage.getItem("accessToken")));
  const [isOpen, setOpen] = useState(false);
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
    // console.log(document.querySelector("form"));
    // document.querySelector("#description").classList.remove("hidden");
    // document.querySelector("#description").classList.add("flex");
    setOpen(!isOpen);
    if (!isOpen) {
      formRef.current.classList.remove("hidden");
      formRef.current.classList.add("flex");
    } else {
      formRef.current.classList.remove("flex");
      formRef.current.classList.add("hidden");
    }
  };

  const updateDescription = (e) => {
    e.preventDefault();
    API.put(`/users/${loggedIn.id}`, {
      description: e.target.description.value,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    window.location.href = `/user/${loggedIn.id}`;
  };

  return (
    <div>
      <h1 className="text-3xl">{user.first_name + " " + user.last_name}</h1>
      <div>
        {user.description ? (
          <p className="text-2xl"><b>Description:</b> {user.description}</p>
        ) : undefined}
        <br />
        <button onClick={showForm} className="w-32 h-10 bg-indigo-500">
          Set Description
        </button>
        <form
          ref={formRef}
          onSubmit={updateDescription}
          className="hidden mx-10 w-1/3 flex-col"
        >
          <input
            className="my-10 pb-40 p-2 bg-gray-100 focus:outline-none border-2 focus:border-indigo-500"
            type="text"
            name="description"
            placeholder={`${user.description}`}
          />
          <input
            className="mx-40 w-40 h-10 rounded-xl bg-indigo-500 cursor-pointer border-4 border-transparent focus:outline-none focus:border-indigo-400"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
