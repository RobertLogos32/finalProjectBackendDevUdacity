import type { Request, Response } from 'express';

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const modifyImage = async (req: Request, res: Response) => {
  const filename = req.query.filename as string;

  const height = req.query.height ? parseInt(req.query.height as string) : NaN;
  const width = req.query.width ? parseInt(req.query.width as string) : NaN;

  try {
    if (
      Number.isNaN(height) ||
      Number.isNaN(width) ||
      height <= 0 ||
      width <= 0
    ) {
      throw new Error('Invalid width or height');
    }
  } catch (error) {
    console.error('Error parsing width or height:', error);
    return res.status(400).send('Invalid width or height');
  }

  const inputPath = path.join(
    __dirname,
    '../../assets/images',
    `${filename}.jpg`
  );
  const outputPath = path.join(
    __dirname,
    '../../assets/thumbs',
    `${filename}-${width}x${height}.jpg`
  );

  if (!fs.existsSync(inputPath)) {
    return res.status(404).send('Immagine originale non trovata');
  }

  if (fs.existsSync(outputPath)) {
    return res.sendFile(outputPath);
  }

  try {
    await sharp(inputPath).resize(width, height).toFile(outputPath);

    return res.sendFile(outputPath);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Errore durante il resize');
  }
};
