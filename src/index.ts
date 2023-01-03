import express, { Express, Request, Response } from 'express';
import expressContext from 'express-request-context';
import { config } from 'dotenv'; // import env variables

config();

import authRoutes from './modules/auth/auth.route';
import checkInRoutes from './modules/checkIn/checkIn.routes';

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(expressContext());

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.use('/auth', authRoutes);
app.use('/checkIn', checkInRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
