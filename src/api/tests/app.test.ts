import app from "../app";
import request from "supertest";
// jest.useFakeTimers();

describe("/healthz endpoint", () => {
  test("should always respond with a 200 status code", async () => {
    const response = await request(app).get("/healthz");
    expect(response.statusCode).toBe(200);
  });
});
