"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	first_name: { type: String, require: true },
	last_name: { type: String, require: true },
	registration_number: { type: String, require: true },
	university: { type: String, require: true },
	course: { type: String, require: true },
	email: { type: String, require: true },
	password: { type: String, require: true }
});

mongoose.model("User", schema);
