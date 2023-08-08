const request = require("supertest");
const app = require("../server.js");
const internRouter = require("../routes/internRoute.js");
const { importData, deleteData } = require("../../seed.js");

//TODO1: Testing status codes and if the id, body arguments are passed correctly
//TODO2: Before running each test, make sure to clear the database and repopulate it with the seed data

beforeEach(async () => {
  await deleteData();
  await importData();
});
describe("testing for GET Method", () => {
  test("retrieving all interns", async () => {
    const response = await request(app).get("/api/v1/interns");
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("retrieving a single intern by it's respective ID ", async () => {
    const response = await request(app).get(
      "/api/v1/interns/64d21abcde270319b981f157"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty(firstname);
  });

  test("Entering an incorrect ID", async () => {
    const response = await request(app).get(
      "/api/v1/64d21abcde270319b981f15vdsvsa466"
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBeFalsy;
  });

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
