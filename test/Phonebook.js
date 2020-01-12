process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");

let should = chai.should();

const app = require("../index");
const PhonebookSchema = require("../models/Phonebook");

chai.use(chaiHttp);

describe("Phonebook", () => {
	beforeEach(done => {
		PhonebookSchema.deleteMany({}, _ => {
			done();
		});
	});
	describe("/POST Contact", () => {
		it("create a contact", done => {
			const contact = {
				firstname: "Dale",
				lastname: "Carnegie",
				phone: "+919698448147",
				favourite: true
			};
			chai.request(app)
				.post("/")
				.send(contact)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					res.body.should.have.property("success").equal(true);
					res.body.data.should.have.property("firstname");
					res.body.data.should.have.property("lastname");
					res.body.data.should.have.property("phone");
					res.body.data.should.have.property("favourite");
					done();
				});
		});
		it("should fail creating a contact without phone", done => {
			const contact = {
				firstname: "Dale",
				lastname: "Carnegie",
				favourite: true
			};
			chai.request(app)
				.post("/")
				.send(contact)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.should.be.a("object");
					res.body.errors[0].should.have.property("msg").equal("Phone number is required");
					done();
				});
		});
	});
	describe("/GET contacts", () => {
		it("get all contacts", done => {
			chai.request(app)
				.get("/")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.have.property("success").equal(true);
					res.body.data.should.be.a("array");
					done();
				});
		});
		it("get a contact by given id", done => {
			const contact = new PhonebookSchema({
				firstname: "Emma",
				lastname: "Watson",
				phone: "+919698448196"
			});
			contact.save((err, response) => {
				chai.request(app)
					.get(`/${response.id}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a("object");
						res.body.should.have.property("success").equal(true);
						res.body.data.should.have
							.property("firstname")
							.eq(contact.firstname);
						res.body.data.should.have
							.property("lastname")
							.eq(contact.lastname);
						res.body.data.should.have
							.property("phone")
							.eq(contact.phone);
						done();
					});
			});
		});
		
	});
	describe("/PATCH contact", () => {
		it("update a contact", done => {
			const contact = new PhonebookSchema({
				firstname: "Ben",
				lastname: "Johnson",
				phone: "+919888448196"
			});
			contact.save((err, response) => {
				const updatedContact = {
					id: response.id,
					firstname: "Ben",
					lastname: "John",
					phone: "+918884482554"
				};
				chai.request(app)
					.patch("/")
					.send(updatedContact)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a("object");
						res.body.should.have.property("success").equal(true);
						res.body.data.should.have
							.property("firstname")
							.eq(contact.firstname);
						res.body.data.should.have
							.property("lastname")
							.eq(contact.lastname);
						res.body.data.should.have
							.property("phone")
							.eq(contact.phone);
						done();
					});
			});
		});
	});
	describe("/DELETE contact", () => {
		it("delete a contact by id", done => {
			const contact = new PhonebookSchema({
				firstname: "Shane",
				lastname: "Warne",
				phone: "+919888448396"
			});
			contact.save((err, response) => {
				chai.request(app)
					.delete(`/${response.id}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a("object");
						res.body.should.have.property("success").equal(true);
						res.body.should.have
							.property("message")
							.equal("Contact deleted");
						res.body.data.should.have
							.property("firstname")
							.eq(contact.firstname);
						res.body.data.should.have
							.property("lastname")
							.eq(contact.lastname);
						res.body.data.should.have
							.property("phone")
							.eq(contact.phone);
						done();
					});
			});
		});
	})
});
