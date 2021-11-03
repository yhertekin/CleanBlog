const express = require("express");
const app = express();

app.get("/", (req, res) => {
	const blog = { id: 1, title: "Blog title", description: "Blog description" };
	res.status(200).send(blog);
});

const port = 8000;
app.listen(port, () => {
	console.log(`Server started at port: ${port}`);
});
