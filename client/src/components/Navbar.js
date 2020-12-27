import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      const token = localStorage.getItem("accessToken");
      setUser(jwt_decode(token, { payload: true }));
      // console.log(jwt_decode(token);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <nav className="w-full h-20 bg-gray-200 text-gray-900 flex justify-between">
      <Link
        className="mx-8 w-32 h-full text-xl flex items-center justify-center border-b-2 hover:border-yellow-500"
        to="/"
      >
        Home
      </Link>
      <ul className="w-1/6 h-full flex items-center justify-around">
        {!localStorage.getItem("accessToken") ? (
          <React.Fragment>
            <li className="w-1/2 h-full border-b-2 hover:border-yellow-500 flex items-center justify-center">
              <Link
                to="/login"
                className="h-full focus:outline-none flex items-center"
              >
                Login
              </Link>
            </li>
            <li className="w-1/2 h-full border-b-2 hover:border-yellow-500 flex items-center justify-center">
              <Link
                to="/register"
                className="h-full focus:outline-none flex items-center"
              >
                Register
              </Link>
            </li>
          </React.Fragment>
        ) : (
          <>
            <li className="w-1/2 h-full border-b-2 hover:border-yellow-500 flex items-center justify-center">
              <Link
                to={`/user/${user.id}`}
                className="h-full focus:outline-none flex items-center"
              >
                {user.username}
              </Link>
            </li>
            <li className="w-1/2 h-full border-b-2 hover:border-yellow-500 flex items-center justify-center">
              <button
                onClick={logout}
                className="h-full focus:outline-none flex items-center"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
