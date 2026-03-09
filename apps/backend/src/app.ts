import express from 'express';
import multer from 'multer';
import cors from 'cors';

import { connectToDatabase } from './utils/db.js';
import { createDefaultUser } from './utils/createDefaultUser.js';
import { getPath } from './utils/pathUtils.js';

import usersRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import logoutRouter from './controllers/logout.js';
import parseVehiclePdf from './controllers/vehicleData.js';
import assignmentRouter from './controllers/assignments.js';

import { unknownEndpoint, errorHandler } from './middleware/errorHandlers.js';

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const distPath = 'demo.akphotography.fi/dist';

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/parse-vehicle-data', upload.single('file'), parseVehiclePdf);
app.use('/api/assignments', assignmentRouter);

await connectToDatabase();
await createDefaultUser();

app.use(express.static(getPath(distPath)));

app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(getPath(distPath, 'index.html'));
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
