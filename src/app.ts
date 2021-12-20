import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import testRouter from "./routers/testRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/test', testRouter);

export async function init () {
  await connectDatabase();
}

export default app;
