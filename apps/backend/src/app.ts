import express from 'express';
import cors from 'cors';

import { connectToDatabase } from './utils/db.js';
import { createDefaultUser } from './utils/createDefaultUser.js';
import { getPath } from './utils/pathUtils.js';

import usersRouter from './controllers/users.js';
import loginRouter from './controllers/login.js';
import logoutRouter from './controllers/logout.js';

import { unknownEndpoint, errorHandler } from './middleware/errorHandlers.js';

const app = express();

app.use(cors());
app.use(express.json());

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const distPath = isProduction
  ? 'public_html/dist'
  : isTest
    ? '../public_html/dist'
    : 'backend/public_html/dist';

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);

await connectToDatabase();
await createDefaultUser();

app.use(express.static(getPath(distPath)));

app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(getPath(distPath, 'index.html'));
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
