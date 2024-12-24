import express from 'express';
import cors from 'cors';

const app = express();

import studentsRouter from './routes/students.routes.js';
import academicYearsRouter from './routes/academic_years.routes.js';
import classesRouter from './routes/classes.routes.js';

const whitelist = [process.env.FRONTEND_URL, undefined];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  // preflightContinue: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use('/students', studentsRouter);
app.use('/academicYears', academicYearsRouter);
app.use('/classes', classesRouter);

app.listen(5000, () => {
  console.log(`Server is listening on PORT 5000`);
});
