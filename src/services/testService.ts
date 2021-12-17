import { getRepository } from "typeorm";
import Test from "../entities/Test";
import Category from "../entities/Category";
import Subject from "../entities/Subject";
import Professor from "../entities/Professor";


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

async function findAvailableTestParams () {
    const categories = await getRepository(Category).find();
    const subjects = await getRepository(Subject).find();
    const professors = await getRepository(Professor).find();

    return {
      categories, subjects, professors
    };
}

export { createTest, findAvailableTestParams };