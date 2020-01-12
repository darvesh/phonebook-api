const { SchemaTypes, Schema, model } = require("mongoose");

const PhoneBookSchema = new Schema({
	firstname: SchemaTypes.String,
	lastname: SchemaTypes.String,
	phone: SchemaTypes.Number,
	secondaryphone: SchemaTypes.Number,
	email: SchemaTypes.String,
	company: SchemaTypes.String,
	group: {
		type: SchemaTypes.String,
		default: "default"
	},
	favourite: {
		type: SchemaTypes.Boolean,
		default: false
	}
});

module.exports = model("PhoneBook", PhoneBookSchema);
