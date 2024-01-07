import { useEffect, useState } from "react";
import Nav from "./Nav";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {

  const [thread, setThread] = useState("");
  const [threadList, setThreadList] = useState([]);
  const navigate = useNavigate();
  const createThread = () => {
    fetch("http://localhost:5174/api/create/thread", {
      method: "POST",
      body: JSON.stringify({
        thread,
        userId: localStorage.getItem("_id"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setThreadList(data.threads);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    const checkUser = () => {
      if (!localStorage.getItem("_id")) {
        Navigate("/");
      } else {
        fetch("http://localhost:4000/api/all/threads")
          .then((res) => res.json())
          .then((data) => setThreadList(data.threads))
          .catch((err) => console.error(err));
      }
    };
    checkUser();
  }, [navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    createThread();
    setThread("");
  };
  return (
    <>
      <Nav />
      <main className="home">
        <h2 className="homeTitle">Create a Thread</h2>
        <form className="homeForm" onSubmit={handleSubmit}>
          {/*--form UI elements--*/}
        </form>
        <div className="thread__container">
          {threadList.map((thread) => (
            <div className="thread__item" key={thread.id}>
              <p>{thread.title}</p>
              <div className="react__container">
                <Likes
                  numberOfLikes={thread.likes.length}
                  threadId={thread.id}
                />
                <Comments
                  numberOfComments={thread.replies.length}
                  threadId={thread.id}
                  title={thread.title}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
export default Home;
