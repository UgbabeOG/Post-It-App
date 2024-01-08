import  { useEffect, useState } from "react";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
	const [thread, setThread] = useState("");
	const [threadList, setThreadList] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const checkUser = async () => {
      if (!localStorage.getItem("_id")) {
        navigate("/");
      } else {
        try {
          const res = await fetch("http://localhost:4000/api/all/threads");
          const data = await res.json();
          setThreadList(data.threads);
        } catch (err) {
          console.error(err);
        }
      }
    };
		checkUser();
	}, [navigate]);

	const createThread = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/create/thread", {
        method: "POST",
        body: JSON.stringify({
          thread,
          userId: localStorage.getItem("_id"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      alert(data.message);
      setThreadList(data.threads);
    } catch (err) {
      console.error(err);
    }
  };
	const handleSubmit = (e) => {
		e.preventDefault();
		createThread();
		setThread("");
	};
	return (
		<>
			<Nav />
			<main className='home'>
				<h2 className='homeTitle'>Create a Thread</h2>
				<form className='homeForm' onSubmit={handleSubmit}>
					<div className='home__container'>
						<label htmlFor='thread'>Title / Description</label>
						<input
							type='text'
							name='thread'
							required
							value={thread}
							onChange={(e) => setThread(e.target.value)}
						/>
					</div>
					<button className='homeBtn'>CREATE THREAD</button>
				</form>

				<div className='thread__container'>
					{threadList.map((thread) => (
						<div className='thread__item' key={thread.id}>
							<p>{thread.title}</p>
							<div className='react__container'>
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