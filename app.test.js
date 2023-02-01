const app = require("./app");
const request = require("supertest");
const mysql = require("mysql2/promise");

jest.useFakeTimers();
jest.mock("mysql2/promise");

describe("/healthz endpoint", () => {
  jest.useFakeTimers();
  test("should always respond with a 200 status code", async () => {
    const response = await request(app).get("/healthz");
    expect(response.statusCode).toBe(200);
  });
});
