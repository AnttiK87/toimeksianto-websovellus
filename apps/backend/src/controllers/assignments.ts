import express, { Request, Response } from 'express';
import models from '../models/index.js';
import { asyncHandler } from '../middleware/errorHandlers.js';
import { AppError } from '../errors/AppError.js';

const { UsedCarForm } = models;

const router = express.Router();

// GET /api/assignments
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const assignments = await UsedCarForm.findAll({});
    res.json(assignments);
  }),
);

// POST /api/assignments
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const formData = req.body;

    // Luo uusi toimeksianto
    const newAssignment = await UsedCarForm.create(formData);

    res.status(201).json({ data: newAssignment, message: 'toimeksianto lisätty' });
  }),
);

// PUT /api/assignments/:id
router.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError('Invalid ID', 400);

    const formData = req.body;

    console.log(formData);

    const assignment = await UsedCarForm.findByPk(id);
    if (!assignment) {
      throw new AppError('Assignment not found', 404);
    }

    const updatedAssignment = await assignment.update(formData);

    res.status(200).json({
      data: updatedAssignment,
      message: 'Toimeksianto päivitetty onnistuneesti',
    });
  }),
);

export default router;
