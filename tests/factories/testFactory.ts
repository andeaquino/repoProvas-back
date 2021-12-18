import { getRepository } from "typeorm";
import Category from "../../src/entities/Category";

import Period from "../../src/entities/Period";
import Professor from "../../src/entities/Professor";
import Subject from "../../src/entities/Subject";

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

export { createTestParams };