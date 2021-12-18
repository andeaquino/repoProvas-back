import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createTestParams } from "../factories/testFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /test/params", () => {
  it("should answer with test params and status 200", async () => {
    const params = await createTestParams();

    const response = await supertest(app).get("/test/params");
    
    expect(response.body).toEqual(
        expect.objectContaining({
          categories: [params.category],
          subjects: [params.subject],
          professors: [params.professor]
        })
    );

    expect(response.status).toBe(200);
  });
});
