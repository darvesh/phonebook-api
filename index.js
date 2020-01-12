const express = require("express");
const mongoose = require("mongoose");

const PhonebookController = require("./controllers/Phonebook");
const config = require("config");

const app = express();

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
	`mongodb://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@${config.MONGO_URL}`,
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	}
);

app.use("/", PhonebookController);

app.use((err, _, res, next) => {
	res.status(err.status || 500);
	return res.json({
		success: false,
		errors: err.errors
	});
});

app.use((_, res)=>{
	return res.status(404).json({
		success: false,
		message: "Path not found"
	})
});

app.listen(config.PORT);

//for tests
module.exports = app;