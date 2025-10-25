import express from "express";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

let posts = [];
let todos = [];
let postId = 0;
let todoId = 0;

function Objector(title, post, author, time) {
  this.title = title;
  this.post = post;
  this.author = author;
  this.time = time;
  this.id = postId++;
}

function generateTime() {
  return new Date().toLocaleString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { posts, addPost: true });
});

app.get("/todo", (req, res) => {
  res.render("todo.ejs", { todos, addPost: false });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { addPost: false });
});

app.post("/submit/post", (req, res) => {
  let title = req.body.title;
  let post = req.body.post;
  let author = req.body.author;
  let time = generateTime();

  posts.push(new Objector(title, post, author, time));
  res.redirect("/");
});

app.post("/submit/todo", (req, res) => {
  let task = req.body.task;
  if (task) todos.push({ task: task, id: todoId });
  todoId++;
  res.redirect("/todo");
});

app.post("/edit/post/:id", (req, res) => {
  let title = req.body.title;
  let post = req.body.post;
  let author = req.body.author;
  let id = req.params.id;

  let editedObj = posts.find((obj) => obj.id == id);
  if (editedObj) {
    editedObj.title = title;
    editedObj.author = author;
    editedObj.post = post;
    editedObj.time = "Edited at " + generateTime();
  }

  res.redirect("/");
});

app.post("/delete/post/:id", (req, res) => {
  let id = req.params.id;

  posts = posts.filter((obj) => obj.id != id);
  res.redirect("/");
});

app.post("/delete/todo/:id", (req, res) => {
  let id = req.params.id;

  todos = todos.filter((obj) => obj.id != id);
  res.redirect("/todo");
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
