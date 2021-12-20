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

describe("GET /test/professors", () => {
  it("should answer with list of professors, their tests and status 200", async () => {
    const params = await createTestParams();
    const body = generateTestBody(params);
    await createTest(body);

    const response = await supertest(app).get("/test/professors");
    
    expect(response.body[0]).toEqual(
        expect.objectContaining({
          id: params.professor.id,
          name: params.professor.name,
          subjectId: params.subject.id,
          test: expect.any(Array)
        })
    );

    expect(response.status).toBe(200);
  });
});

describe("GET /test/subjects", () => {
  it("should answer with list of subjects, their tests and status 200", async () => {
    const params = await createTestParams();
    const body = generateTestBody(params);
    await createTest(body);

    const response = await supertest(app).get("/test/subjects");
    
    expect(response.body[0]).toEqual(
        expect.objectContaining({
          id: params.subject.id,
          name: params.subject.name,
          periodId: params.subject.periodId,
          test: expect.any(Array)
        })
    );

    expect(response.status).toBe(200);
  });
});

