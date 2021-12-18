import { getRepository } from "typeorm";

import Category from "../../src/entities/Category";
import Period from "../../src/entities/Period";
import Professor from "../../src/entities/Professor";
import Subject from "../../src/entities/Subject";

export async function clearDatabase () {
  await getRepository(Category).delete({});
  await getRepository(Professor).delete({});
   await getRepository(Subject).delete({});
  await getRepository(Period).delete({})
}
