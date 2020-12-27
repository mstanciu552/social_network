import React from "react";
import axios from "axios";
import Alert from "./Alert";

const Register = () => {
  const register = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3030/users`, {
        username: e.target.username.value,
        first_name: e.target.first_name.value,
        last_name: e.target.last_name.value,
        pass: e.target.pass.value,
      })
      .then((res) => {
        window.location.href = "/";
        return <Alert type="success" res={res}></Alert>;
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-full h-1/2 flex flex-col items-center justify-center ">
      <form
        method="POST"
        onSubmit={register}
        className="w-96 h-96 flex flex-col items-center justify-evenly "
      >
        <label className="text-3xl">Register Form</label>
        <label className="w-full text-xl" htmlFor="first_name">
          First Name
        </label>
        <input
          className="w-full h-10  focus:outline-none px-4 py-2 focus:bg-gray-100 border-2 focus:border-gray-700"
          type="text"
          id="first_name"
          placeholder="Input Here..."
        />
        <label className="w-full text-xl" htmlFor="last_name">
          Last Name
        </label>
        <input
          className="w-full h-10  focus:outline-none px-4 py-2 focus:bg-gray-100 border-2 focus:border-gray-700"
          type="text"
          id="last_name"
          placeholder="Input Here..."
        />
        <label className="w-full text-xl" htmlFor="username">
          Userame
        </label>
        <input
          className="w-full h-10  focus:outline-none px-4 py-2 focus:bg-gray-100 border-2 focus:border-gray-700"
          type="text"
          id="username"
          placeholder="Input Here..."
        />
        <label className="w-full text-xl" htmlFor="pass">
          Password
        </label>
        <input
          className="w-full h-10  focus:outline-none px-4 py-2 focus:bg-gray-100 border-2 focus:border-gray-700"
          type="password"
          id="pass"
          placeholder="Input Here..."
        />
        <input
          className="mt-10 w-1/3 h-10 bg-indigo-600 text-gray-100 cursor-pointer"
          type="submit"
          value="Register now"
        />
      </form>
    </div>
  );
};

export default Register;
