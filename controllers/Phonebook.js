const router = require("express").Router();

const { validationResult } = require("express-validator");

const PhonebookSchema = require("../models/Phonebook");
const {
	newPhoneBookValidator,
	updatePhoneBookValidator,
	contactValidator
} = require("../utils/validators");

router.get("/:id", contactValidator, async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next({
			status: 400,
			...errors
		});
	}
	const id = req.params.id;
	const contact = await PhonebookSchema.findById(id);
	if (contact) {
		return res.status(200).json({
			success: true,
			data: contact
		});
	}
	return res.status(404).json({
		success: false,
		message: "No contact found"
	});
});

router.get("/", async (_, res) => {
	const contacts = await PhonebookSchema.find();
	return res.status(200).json({
		success: true,
		data: contacts
	});
});

router.post("/", newPhoneBookValidator, async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next({
			status: 400,
			...errors
		});
	}
	const Phonebook = new PhonebookSchema(req.body);
	const result = await Phonebook.save();
	return res.status(200).json({
		success: true,
		message: "Contact added successfully",
		data: result
	});
});

router.patch("/", updatePhoneBookValidator, async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next({
			status: 400,
			errors
		});
	}
	const { id, ...contactPayload } = req.body;
	const contact = await PhonebookSchema.findByIdAndUpdate(id, contactPayload);
	if (!contact) {
		return next({
			status: 404,
			errors: "Contact not found"
		});
	}
	return res.status(200).json({
		success: true,
		data: contact
	});
});

router.delete("/:id", contactValidator, async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next({
			status: 400,
			errors
		});
	}
	const id = req.params.id;
	const contact = await PhonebookSchema.findByIdAndRemove(id);
	if (!contact) {
		return next({
			status: 404,
			errors: "Contact not found"
		});
	}
	return res.status(200).json({
		success: true,
		message: "Contact deleted",
		data: contact
	});
});

module.exports = router;