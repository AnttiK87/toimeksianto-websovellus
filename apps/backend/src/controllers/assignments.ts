import express, { Request, Response } from 'express';
import models from '../models/index.js';
import { asyncHandler } from '../middleware/errorHandlers.js';
import { AppError } from '../errors/AppError.js';
import { patchRepair } from '../utils/editRepair.js';

const { UsedCarAssignment, PaintAssignment } = models;

const router = express.Router();

// GET /api/assignments
router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const assignments = await UsedCarAssignment.findAll({});
    res.json(assignments);
  }),
);

// GET /api/assignments/:id
router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError('Invalid ID', 400);

    const assignment = await UsedCarAssignment.findOne({
      where: { id: id },
    });

    res.json(assignment);
  }),
);

// POST /api/assignments
router.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const formData = req.body;

    // Luo uusi toimeksianto
    const newAssignment = await UsedCarAssignment.create(formData);

    res.status(201).json({ data: newAssignment, message: 'toimeksianto lisätty' });
  }),
);

// PUT /api/assignments/:id
router.put(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    console.log('tässä: ', id);
    if (isNaN(id)) throw new AppError('Invalid ID', 400);

    const formData = req.body;

    const assignment = await UsedCarAssignment.findByPk(id);
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

// GET /api/assignments/paint/:id
router.get(
  '/paint/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError('Invalid ID', 400);

    const assignment = await PaintAssignment.findOne({
      where: { assignmentId: id },
    });

    res.json(assignment);
  }),
);

// POST /api/assignments/paint
router.post(
  '/paint',
  asyncHandler(async (req: Request, res: Response) => {
    const formData = req.body;

    await PaintAssignment.create(formData);

    res.status(201).json({ message: 'Maalaustoimeksianto lisätty' });
  }),
);

// PUT /api/assignments/paint/:id
router.put(
  '/paint/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new AppError('Invalid ID', 400);

    const formData = req.body;

    const assignment = await PaintAssignment.findOne({
      where: { assignmentId: id },
    });
    if (!assignment) {
      throw new AppError('Assignment not found', 404);
    }

    await assignment.update(formData);

    res.status(200).json({
      message: 'Maalaustoimeksianto päivitetty onnistuneesti',
    });
  }),
);

router.patch(
  '/repairs/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const patches = req.body;

    const assignment = await UsedCarAssignment.findByPk(id);
    if (!assignment) throw new AppError('Assignment not found', 404);

    for (const patch of patches) {
      patchRepair(assignment, patch.path, patch.value);
    }

    const updatedAssignment = await assignment.save();
    //console.log(updatedAssignment);
    res
      .status(200)
      .json({ data: updatedAssignment, message: 'Toimeksianto päivitetty onnistuneesti' });
  }),
);

export default router;
