const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// const ejs = require("ejs");
const pageController = require("./controllers/pageController");
const postController = require("./controllers/postController");

const app = express();

// connect db
mongoose.connect(
	"mongodb+srv://yhertekin:QsBxsbbNQRFuWDDC@cluster0.mhpr5.mongodb.net/cleanblog?retryWrites=true&w=majority"
);

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

app.get("/", postController.getAllPosts);
app.get("/posts/:id", postController.getPost);
app.post("/posts", postController.createPost);
app.put("/posts/:id", postController.updatePost);
app.delete("/posts/:id", postController.deletePost);

app.get("/about", pageController.getAboutPage);
app.get("/add_post", pageController.getAddPage);
app.get("/posts/edit/:id", pageController.getEditPage);

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server started at port: ${port}`);
});
