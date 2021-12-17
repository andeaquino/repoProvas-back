import { getRepository } from "typeorm";
import Test from "../entities/Test";

interface TestCreate {
    name: string;
    category_id: number;
    professor_id: number;
    subject_id: number;
    pdf: string;
}

async function createTest(test: TestCreate) {
    const existingTask = await getRepository(Test).find({ name: test.name });

    if (existingTask.length !== 0) return false;
  
    await getRepository(Test).insert(test);
    return true;
}

export { createTest };