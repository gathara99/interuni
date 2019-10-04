"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	title: { type: String, require: true },
	description: { type: String, require: true }
});

schema.index({
	title: "text",
	description: "text"
});

mongoose.model("Project", schema);
