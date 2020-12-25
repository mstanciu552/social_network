import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/articles`)
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-evenly">
      {articles.map((article) => {
        return (
          <div
            key={article.id}
            className="my-7 w-3/4 h-36 border-2 border-gray-200 rounded-lg"
          >
            <h1 className="px-2 py-auto w-full h-1/3 text-3xl border-b-2 border-gray-200">
              <Link
                to={`/article/${article.id}`}
                className="hover:text-indigo-600"
              >
                {article.title}
              </Link>
            </h1>
            <p className="p-2 text-xl">{article.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Articles;
