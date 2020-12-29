import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

const Article = ({ id }) => {
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState([{}]);

  useEffect(() => {
    API.get(`/articles/${id}`)
      .then((res) => {
        setArticle(res.data[0]);
        API.get(`/users/${res.data[0].author}`)
          .then((response) => {
            setAuthor(response.data[0]);
          })
          .catch((error) => console.error(error));
        API.get(`/articles/${res.data[0].id}/comments`)
          .then((response) => setComments(response.data))
          .catch((err) => console.error(err));
        API.get(`/users/${res.data[0].author}`)
          .then((result) => {
            setUsername({
              id: res.data[0].id,
              username: result.data[0].username,
            });
          })
          .catch((err) => console.error(err));
        API.get(`/users/${res.data[0].author}`)
          .then((result) => {
            setUsername(result.data[0].username);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, [id]);

  const addComment = (e) => {
    e.preventDefault();

    API.post(`/articles/${article.id}/comments`, {
      comment: e.target.comment.value,
      author: author.id,
    }).catch((err) => console.error(err));

    window.location.reload();
  };

  console.log(username);

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
        <div className="w-full h-1/4 flex justify-end border-t-2 border-b-2 border-gray-200">
          <p className="px-10 text-xl">
            by{" "}
            <Link className="hover:text-indigo-600" to={`/user/${author.id}`}>
              {author.first_name + " " + author.last_name}
            </Link>
          </p>
        </div>
        <div className="px-10">
          <h1>Comments section:</h1>
          <br />
          <form
            className="flex items-center justify-around"
            onSubmit={addComment}
          >
            <textarea
              className="w-3/4 bg-gray-100 border-2 border-indigo-500 rounded-lg"
              name="comment"
              id="comment"
            ></textarea>
            <input
              className="w-20 h-10 bg-indigo-500 text-gray-100 cursor-pointer inline-block"
              type="submit"
              value="Comment"
            />
          </form>
          <div>
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-center justify-between"
              >
                <p>{comment.comment}</p>
                <p>
                  {username.id == comment.id ? username.username : undefined}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
