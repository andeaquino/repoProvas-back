import { Request, Response } from "express";
import { testSchema } from "../schemas/testSchema";
import * as testService from "../services/testService";

async function createTest (req: Request, res: Response) {
    try {
      if (testSchema.validate(req.body).error) return res.sendStatus(403);

      const created = await testService.createTest(req.body);

      if (!created) {
        return res.sendStatus(409);
      }

      res.sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}

async function findAvailableTestParams(req: Request, res: Response) {
    try {
      const params = await testService.findAvailableTestParams();
      res.send(params);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}

async function findProfessorsWithTests(req: Request, res: Response) {
  try {
      const professors = await testService.findProfessorsWithTests();
      res.send(professors);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}

async function findSubjectsWithTests(req: Request, res: Response) {
  try {
      const subjects = await testService.findSubjectsWithTests();
      res.send(subjects);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}

export { createTest, findAvailableTestParams, findProfessorsWithTests, findSubjectsWithTests };