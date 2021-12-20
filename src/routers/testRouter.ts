import express from 'express';
import * as testController from "../controllers/testController";

const router = express.Router();

router.post('', testController.createTest);
router.get('/params', testController.findAvailableTestParams);
router.get('/professors', testController.findProfessorsWithTests);
router.get('/subjects', testController.findSubjectsWithTests);

export default router;