const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("./utils/auth");
require("./middleware/db")
const userRoutes = require("./routes/userRoutes");
const fileRoutes = require("./routes/fileRoutes");
const groupRoutes = require("./routes/groupRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentsRoutes");
const upvoteRoutes = require("./routes/upvotesRoutes");

dotenv.config();
const app = express();
app.use(
  session({
    secret: "your-secret-key", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000, // 1 hour (in milliseconds)
      sameSite: "strict",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(userRoutes);
app.use(fileRoutes);
app.use(groupRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(upvoteRoutes);

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Connect with google</a>');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});




