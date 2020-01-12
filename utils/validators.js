const { body, param } = require("express-validator");
const {
	Types: { ObjectId }
} = require("mongoose");

module.exports.newPhoneBookValidator = [
	body("firstname", "Invalid first name")
		.exists()
		.withMessage("First name is required")
		.trim()
		.isAlpha(),
	body("lastname", "Invalid last name")
		.exists()
		.withMessage("Last name is required")
		.trim()
		.isAlpha(),
	body("phone", "Invalid phone number")
		.exists()
		.withMessage("Phone number is required")
		.isMobilePhone("en-IN"),
	body("secondaryphone", "Invalid phone number")
		.optional()
		.isMobilePhone("en-IN"),
	body("email")
		.optional()
		.isEmail(),
	body("company", "Invalid company name")
		.optional()
		.isAlphanumeric(),
	body("favourite", "Invalid favourite value")
		.optional()
		.isBoolean(),
	body("group", "Invalid group name")
		.optional()
		.isAlpha()
];

module.exports.updatePhoneBookValidator = [
	body("id", "id is not found")
		.exists()
		.custom(value => ObjectId.isValid(value))
		.withMessage("Invalid id"),
	body("firstname", "Invalid first name")
		.optional()
		.trim()
		.isAlpha(),
	body("lastname", "Invalid last name")
		.optional()
		.trim()
		.isAlpha(),
	body("phone", "Invalid phone number")
		.optional()
		.isMobilePhone("en-IN"),
	body("secondaryphone", "Invalid phone number")
		.optional()
		.isMobilePhone("en-IN"),
	body("email")
		.optional()
		.isEmail(),
	body("company", "Invalid company name")
		.optional()
		.isAlphanumeric(),
	body("favourite", "Invalid favourite value")
		.optional()
		.isBoolean(),
	body("group", "Invalid group name")
		.optional()
		.isAlpha()
];

module.exports.contactValidator = [
	param("id")
		.exists()
		.custom(value => ObjectId.isValid(value))
		.withMessage("Invalid id")
]