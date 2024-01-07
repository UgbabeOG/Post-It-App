//👇🏻index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

//👇🏻 holds all the existing users this should be converted to database
const users = [];
//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);
//register
app.post("/api/register", async (req, res) => {
  const { email, password, username } = req.body;
  const id = generateID();
  //👇🏻 ensures there is no existing user with the same credentials
  const result = users.filter(
    (user) => user.email === email && user.password === password
  );
  //👇🏻 if true
  if (result.length === 0) {
    const newUser = { id, email, password, username };
    //👇🏻 adds the user to the database (array)
    users.push(newUser);
    //👇🏻 returns a success message
    return res.json({
      message: "Account created successfully!",
    });
  }
  //👇🏻 if there is an existing user
  res.json({
    error_message: "User already exists",
  });
});
//login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  //👇🏻 checks if the user exists
  let result = users.filter(
    (user) => user.email === email && user.password === password
  );
  //👇🏻 if the user doesn't exist
  if (result.length !== 1) {
    return res.json({
      error_message: "Incorrect credentials",
    });
  }
  //👇🏻 Returns the id if successfuly logged in
  res.json({
    message: "Login successfully",
    id: result[0].id,
  });
});
//threads
//👇🏻 holds all the posts created
const threadList = [];

app.post("/api/create/thread", async (req, res) => {
  const { thread, userId } = req.body;
  const threadId = generateID();

  //👇🏻 add post details to the array
  threadList.unshift({
    id: threadId,
    title: thread,
    userId,
    replies: [],
    likes: [],
  });

  //👇🏻 Returns a response containing the posts
  res.json({
    message: "Thread created successfully!",
    threads: threadList,
  });
});
//
app.get("/api/all/threads", (req, res) => {
    res.json({
        threads: threadList,
    });
});