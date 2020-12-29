import React from "react";
import API from "../api";
import jwt_decode from "jwt-decode";

const NewArticle = () => {
  const submitArticle = (e) => {
    e.preventDefault();
    const user = jwt_decode(localStorage.getItem("accessToken"));
    API.post("/articles", {
      title: e.target.title.value,
      body: e.target.body.value,
      author: user.id,
    })
      .then((_) => (window.location.href = "/"))
      .catch((err) => console.error(err));
  };
  return (
    <div className="w-full flex items-start justify-center">
      <form
        className="w-1/3 h-1/2 flex flex-col items-center justify-around gap-10"
        onSubmit={submitArticle}
      >
        <label className="text-3xl" htmlFor="title">
          Title
        </label>
        <input
          className="w-full py-2 bg-gray-100 focus:outline-none border-2 border-transparent focus:border-indigo-500 rounded-lg"
          type="text"
          name="title"
          id="title"
        />
        <label className="text-3xl" htmlFor="body">
          Body
        </label>
        <textarea
          className="h-80 w-full py-2 bg-gray-100 focus:outline-none border-2 border-transparent focus:border-indigo-500 rounded-lg"
          type="text"
          name="body"
          id="body"
        />
        <input
          className="w-40 h-10 bg-indigo-500 text-gray-100 rounded-lg cursor-pointer"
          type="submit"
          value="Post"
        />
      </form>
    </div>
  );
};

export default NewArticle;
