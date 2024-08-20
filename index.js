const express = require("express");
const path = require("path");

const app = express();
const PORT = 5001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const getUserProfile = require("./controllers/user-profile");
const getUserSubmissions = require("./controllers/user-submissions");
const getUserBlogEntry = require(".//controllers/user-blog-entry");
const getUserRatingHistory = require("./controllers/user-rating");
// app.use("/", staticRoute);

app.get("/", (req, res) => {
  return res.render("home");
});

app.get("/user-profile", (req, res) => {
  res.render("user-profile");
});

app.get("/user-blogs", (req, res) => {
  res.render("user-blogs");
});
app.get("/user-submissions", (req, res) => {
  res.render("user-submission");
});
app.get("/user-rating", (req, res) => {
  res.render("user-rating");
});

app.get("/user-profile/user", getUserProfile);
app.get("/user-submissions/user", getUserSubmissions);
app.get("/user-blogs/user", getUserBlogEntry);
app.get("/user-rating/user", getUserRatingHistory);

app.listen(PORT, () => console.log(`server is listenting at port ${PORT}`));
