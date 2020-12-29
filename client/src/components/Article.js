import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Article = ({ id }) => {
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  useEffect(() => {
    API.get(`/articles/${id}`)
      .then((res) => {
        setArticle(res.data[0]);
        API.get(`/users/${res.data[0].author}`)
          .then((response) => {
            setAuthor(response.data[0]);
          })
          .catch((error) => console.error(error));
      })
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-3/4 h-3/4 border-2 rounded-lg border-gray-200 flex flex-col">
        <div className="h-1/3">
          <h1 className="p-10 text-4xl text-indigo-600 border-b-2 border-gray-200">
            {article.title}
          </h1>
        </div>
        <div className="w-full h-1/2">
          <p className="px-10 text-lg">{article.body}</p>
        </div>
        <div className="w-full h-1/4 flex justify-end border-t-2 border-gray-200">
          <p className="px-10 text-xl">
            by{" "}
            <Link className="hover:text-indigo-600" to={`/user/${author.id}`}>
              {author.first_name + " " + author.last_name}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Article;
