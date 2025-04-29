import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { parseInputExercises, calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.json({error: 'malformed parameters'});
    }
    const bmi = calculateBmi(height, weight);
    res.json({
        weight,
        height,
        bmi
    });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if (!target || !daily_exercises) {
    res.status(400).json({error: 'parameters missing'});
    return;
  }
  try {
    const inputs = parseInputExercises([target as string, ...daily_exercises as string[]]);
    const results = calculateExercises(inputs.exercises, inputs.target);
    res.json(results);
  } catch (exception) {
    if (exception instanceof Error) {
      res.status(400).json({error: 'malformed parameters'});
    } else {
      res.status(500).json({error: 'internal server error'});
    }
  }

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});