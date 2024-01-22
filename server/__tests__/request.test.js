const request = require("supertest");
const app = require("../server.js");
const User = require();
// const interns = require("../../seed.json");

const internRouter = require("../routes/requestRoute.js");
const {
  importRequestData,
  deleteRequestData,
} = require("../../requestSeed.js");

//TODO1: Testing status codes and if the id, body arguments are passed correctly
//TODO2: Before running each test, make sure to clear the database and repopulate it with the seed data

describe("testing for GET Method", () => {
  // beforeEach(async () => {
  //   await importData(); // Populate the database before each test
  // });

  // afterEach(async () => {
  //   await deleteData(); // Delete data after each test
  // });

  test("retrieving all requests", async () => {
    const response = await request(app).get("/api/v1/request");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("retrieving a single intern by it's respective ID at /api/v1/requests/:id", async () => {
    const response = await request(app).get(
      "/api/v1/requests/64d4c4929369f850158ccc83"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty("start_date");
  });

  test("Entering an incorrect ID", async () => {
    const response = await request(app).get(
      "/api/v1/requests/64d4b9aa0ee33587c42041a6afsfa"
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBeFalsy;
  });
});

describe("testing for POST Method", () => {
  test("creates data in the database", async () => {
    const response = await request(app).post("/api/v1/requests").send({
      user: "64d4acbc6147c8560a3e109c",
      start_date: "2023-09-24",
      end_date: "2023-10-23",
      status: "pending",
      reason: "Just trying to go to a place on these days!",
      additional_notes: "I need a break.",
    });
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test.skip("cannot create data with duplicate fields", async () => {
    const response = await request(app).post("/api/v1/interns").send({
      user: "64d4acbc6147c8560a3e109c",
      start_date: "2023-09-24",
      end_date: "2023-10-23",
      status: "pending",
      reason: "Just trying to go to a place on these days!",
      additional_notes: "I need a break.",
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("cannot create data with empty fields", async () => {
    const response = await request(app).post("/api/v1/requests").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe("testing for PUT and DELETE Methods", () => {
  test("updating data in the database by their fields", async () => {
    const response = await request(app)
      .put("/api/v1/interns/64d50003c2447908d62594f9")
      .send({
        status: "approved",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy;
    expect(response.body.data.status).toBe("approved");
  });

  test.skip("deleting data from the database", async () => {
    const response = await request(app).delete(
      "/api/v1/interns/64d389c9c45a7057818ed888"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual({});
  });
});
