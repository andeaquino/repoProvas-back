import joi from 'joi';

const testSchema = joi.object({
    name: joi.string().required(),
    category_id: joi.number().required(),
    professor_id: joi.number().required(),
    subject_id: joi.number().required(),
    pdf: joi.string().required()
});

export { testSchema };