import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createTest, createTestParams, generateTestBody } from "../factories/testFactory";
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

describe("POST /test", () => {
    it("should answer with status 403 for invalid body", async () => {
      const body = {}

      const response = await supertest(app).post("/test").send(body);

      expect(response.status).toBe(403);
    });

    it("should answer with status 201 for sucess", async () => {
      const params = await createTestParams();
      const body = generateTestBody(params);

      const response = await supertest(app).post("/test").send(body);

      expect(response.status).toBe(201);
    });
  
    it("should answer with status 409 for invalid name", async () => {
      const params = await createTestParams();
      const body = generateTestBody(params);
      const newBody = {...body};
      await createTest(body);

      const response = await supertest(app).post("/test").send(newBody);

      expect(response.status).toBe(409);
  });
});

