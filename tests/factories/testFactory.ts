import { getRepository } from "typeorm";
import faker from 'faker';

import Category from "../../src/entities/Category";
import Period from "../../src/entities/Period";
import Professor from "../../src/entities/Professor";
import Subject from "../../src/entities/Subject";
import Test from "../../src/entities/Test";

interface TestCreate {
    name: string;
    category_id: number;
    professor_id: number;
    subject_id: number;
    pdf: string;
}

interface Params {
  category: {
    id: number;
    name: string;
  };
  subject: {
    id: number;
    name: string;
    periodId: number;
  };
  professor: {
    id: number;
    name: string;
    subjectId: number;
  };
}

async function createTestParams() {
    const category = await getRepository(Category).create({
      name: 'P1'
    });
    await getRepository(Category).save(category);

    const period = await getRepository(Period).create({
        name: '1º sem'
    });
    await getRepository(Period).save(period);

    const subject = await getRepository(Subject).create({
        name: 'MA 001',
        periodId: period.id
    });
    await getRepository(Subject).save(subject);
    
    const professor = await getRepository(Professor).create({
      name: 'Ronaldo Teste',
      subjectId: subject.id
    })
    await getRepository(Professor).save(professor);

    return {
      category,
      subject,
      professor
    }
}

function generateTestBody(params: Params) {
  return {
    name: faker.name.findName(),
    category_id: params.category.id,
    professor_id: params.professor.id,
    subject_id: params.subject.id,
    pdf: faker.internet.url()
  }
}

async function createTest(body: TestCreate) {
  await getRepository(Test).save(body);
}

export { createTestParams, generateTestBody, createTest };