import { getRepository } from "typeorm";
import Test from "../entities/Test";

interface CreateTest {
    name: string;
    category_id: number;
    professor_id: number;
    subject_id: number;
    pdf: string;
}

async function createTest(test: CreateTest) {
  console.log(test);
    await getRepository(Test).insert(test);
  return true;
}

export { createTest };