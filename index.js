"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

require("./models");

mongoose.connect("mongodb://test:test@127.0.0.1:27017/test", {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(bodyParser.json());

app.use(express.static("static"));

app.post("/add-project", async (req, res) => {
	let project = await mongoose.model("Project").create(req.body);
	return res.json(project);
});

app.get("/projects", async (req, res) => {
	let projects = await mongoose.model("Project").find();
	return res.json(projects);
});

app.get("/search", async (req, res) => {
	let projects = await mongoose
		.model("Project")
		.find({ $text: { $search: req.query.searchString } });
	return res.json(projects);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
