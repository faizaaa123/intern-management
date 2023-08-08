const request = require("supertest");
const app = require("../server.js");
const internRouter = require("../routes/internRoute.js");

//TODO1: Testing status codes and if the id, body arguments are passed correctly
//TODO2: Before running each test, make sure to clear the database and repopulate it with the seed data
describe("testing for GET Method", () => {
  test("getting all interns", async () => {
    const response = await request(app).get("/api/v1/interns");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // test("getting a single intern by ID", async () => {
  //   const response = await request(app).get("/api/v1/interns/1");
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.success).toBe(true);
  // });

  // test("creating an  intern", async () => {
  //   const response = await request(app)
  //     .post("/api/v1/interns")
  //     .send({ firstName: "firstname", lastName: "lastname" });
  //   expect(response.statusCode).toBe(200);
  // });

  // test("updating a single intern by ID", async () => {
  //   const response = await request(app).put("/api/v1/interns/1").send({
  //     firstName: "yahya",
  //   });
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.success).toBe(true);
  // });

  // test("deleting an intern", async () => {
  //   const response = await request(app).delete("/api/v1/interns/1");
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.success).toBe(true);
  // });
});
