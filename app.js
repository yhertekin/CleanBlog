const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// const ejs = require("ejs");

const Post = require("./models/Post");

const app = express();

// connect db
mongoose.connect("mongodb://localhost/cleanblog-test-db");

app.set("view engine", "ejs");

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
	methodOverride("_method", {
		methods: ["POST", "GET"],
	})
);

app.get("/", async (req, res) => {
	const posts = await Post.find({});
	res.render("index", { posts });
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/add_post", (req, res) => {
	res.render("add_post");
});

app.get("/posts/:id", async (req, res) => {
	const post = await Post.findById(req.params.id);
	res.render("post", { post });
});

app.get("/posts/edit/:id", async (req, res) => {
	const post = await Post.findById(req.params.id);
	res.render("edit_post", {
		post,
	});
});

app.post("/posts", async (req, res) => {
	await Post.create(req.body);
	res.redirect("/");
});

app.put("/posts/:id", async (req, res) => {
	const post = await Post.findById(req.params.id);
	post.title = req.body.title;
	post.detail = req.body.detail;
	post.save();
	res.redirect(`/posts/${post._id}`);
});

app.delete("/posts/:id", async (req, res) => {
	await Post.findByIdAndRemove(req.params.id);
	res.redirect("/");
});

const port = 8000;
app.listen(port, () => {
	console.log(`Server started at port: ${port}`);
});
