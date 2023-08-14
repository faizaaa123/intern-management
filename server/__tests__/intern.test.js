const request = require("supertest");
const app = require("../server.js");
const User = require();
const interns = require("../../seed.json");

const internRouter = require("../routes/internRoute.js");
const { importData, deleteData } = require("../../seed.js");

//TODO1: Testing status codes and if the id, body arguments are passed correctly
//TODO2: Before running each test, make sure to clear the database and repopulate it with the seed data

describe("testing for GET Method", () => {
  // beforeEach(async () => {
  //   await importData(); // Populate the database before each test
  // });

  // afterEach(async () => {
  //   await deleteData(); // Delete data after each test
  // });

  test("retrieving all interns", async () => {
    const response = await request(app).get("/api/v1/interns");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("retrieving a single intern by it's respective ID at /api/v1/:id", async () => {
    const response = await request(app).get(
      "/api/v1/interns/64d389c9c45a7057818ed888"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("firstname");
  });

  test("Entering an incorrect ID", async () => {
    const response = await request(app).get(
      "/api/v1/64d245816cb6f6456261f684sawsfa"
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBeFalsy;
  });
});

describe("testing for POST Method", () => {
  test("creates data in the database", async () => {
    const response = await request(app).post("/api/v1/interns").send({
      firstname: "Testing",
      lastname: "Testing",
      email: "Testing@testing.com",
      password: "hashedpassword3",
      role: "supervisor",
      supervisor: null,
      internRole: null,
      last_checkin: "2023-08-10T08:15:00.000Z",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test("cannot create data with duplicate fields", async () => {
    const response = await request(app).post("/api/v1/interns").send({
      firstname: "Michael",
      lastname: "Johnson",
      email: "michael@example.com",
      password: "hashedpassword3",
      role: "supervisor",
      supervisor: null,
      internRole: null,
      last_checkin: "2023-08-10T08:15:00.000Z",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("cannot create data with empty fields", async () => {
    const response = await request(app).post("/api/v1/interns").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe("testing for PUT and DELETE Methods", () => {
  test("updating data in the database by their fields", async () => {
    const response = await request(app)
      .put("/api/v1/interns/64d389c9c45a7057818ed888")
      .send({
        firstname: "justAfirstName",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy;
    expect(response.body.data.firstname).toBe("justAfirstName");
  });

  test("deleting data from the database", async () => {
    const response = await request(app).delete(
      "/api/v1/interns/64d389c9c45a7057818ed888"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual({});
  });
});
