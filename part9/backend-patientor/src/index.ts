import express from 'express';
import cors from 'cors';
import { Request } from 'express';

import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import middleware from './routes/middleware';

const baseUrl = '/api';
const app = express();

app.use(cors<Request>());
app.use(express.json());

const PORT = 3001;

app.get(baseUrl + '/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use(baseUrl + '/diagnoses', diagnosisRouter);
app.use(baseUrl + '/patients', patientRouter);

app.use(middleware.errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
