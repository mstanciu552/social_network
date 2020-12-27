import React from "react";
import axios from "axios";

const Login = () => {
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/login", {
        username: e.target.username.value,
        pass: e.target.pass.value,
      })
      .then((res) => {
        const { accessToken } = res.data;
        localStorage.setItem("accessToken", accessToken);
        window.location.href = "/";
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-full h-1/2 flex flex-col items-center justify-center ">
      <form
        method="POST"
        onSubmit={login}
        className="w-96 h-96 flex flex-col items-center justify-evenly "
      >
        <label className="text-3xl">Login Form</label>

        <label className="w-full text-xl" htmlFor="username">
          Username
        </label>
        <input
          className="w-full h-10  focus:outline-none px-4 py-2 focus:bg-gray-100 border-2 focus:border-gray-700"
          type="text"
          name="username"
          placeholder="Input Here..."
        />
        <label className="w-full text-xl" htmlFor="pass">
          Password
        </label>
        <input
          className="w-full h-10  focus:outline-none px-4 py-2 focus:bg-gray-100 border-2 focus:border-gray-700"
          type="password"
          name="pass"
          placeholder="Input Here..."
        />
        <input
          className="mt-10 w-1/3 h-10 bg-indigo-600 text-gray-100 cursor-pointer"
          type="submit"
          value="Login now"
        />
      </form>
    </div>
  );
};

export default Login;
