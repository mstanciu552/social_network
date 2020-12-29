import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="w-full flex flex-col items-center justify-around">
      <h1 className="text-3xl">{user.first_name + " " + user.last_name}</h1>
      <div>
        {user.description ? (
          <p className="my-20 text-2xl">
            <b>Description:</b> {user.description}
          </p>
        ) : undefined}
        <br />
        <div className="w-96 h-96 flex flex-col items-center justify-around">
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
          <Link
            to="/article"
            className="w-60 h-10 border-2 border-indigo-500 text-xl rounded-xl flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 text-indigo-500 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
