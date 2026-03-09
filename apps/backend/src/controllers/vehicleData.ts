import { VehiclePdfData } from '@shared/types/form.js';
import express, { Request, Response } from 'express';
import { PDFParse } from 'pdf-parse';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'PDF tiedosto puuttuu' });
    }

    const parser = new PDFParse({
      data: req.file.buffer,
    });
    const result = await parser.getText();
    const text = result.text;

    const regNumber = text.match(/Rek\.nro:\s*([A-Z0-9-]+)/)?.[1] || '';

    const mileage = text.match(/Ajomäärä:\s*(\d+)/)?.[1] || '';

    const inspectionInterval = text.match(/Seuraava katsastus:\s*([^\n]+)/)?.[1] || '';
    const nextInspection = inspectionInterval ? inspectionInterval.trim().slice(12) : '';

    const firstRegistration = text.match(/Ens\. käyttöönottopäivä:\s*([0-9.]+)/)?.[1] || '';

    const match = text.match(/Trafi-tiedot haettu([\s\S]*?)Huomioitavaa:/);

    const model = match ? match[1].trim().slice(12).replace(/\n/g, ' ') : '';

    return res.json({
      regNumber,
      mileage,
      firstRegistration,
      nextInspection,
      model,
    } as VehiclePdfData);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'PDF:n käsittely epäonnistui',
    });
  }
});

export default router;
