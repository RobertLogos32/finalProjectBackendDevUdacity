import express from 'express';

import imageRouter from './routes/imageRouter.js';

import cors from 'cors';
const app = express();
app.use(cors());

app.use('/api', imageRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;
