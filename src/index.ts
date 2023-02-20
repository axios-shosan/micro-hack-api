import express, { Express, Request, Response } from 'express';
import expressContext from 'express-request-context';
import { config } from 'dotenv'; // import env variables

import authRoutes from './modules/auth/auth.route';
import checkInRoutes from './modules/checkIn/checkIn.routes';
import shareMomentSessionRoutes from './modules/shmSession/shmSession.routes';
import shareMomentRoutes from './modules/shareMoment/shm.routes';
import announcementRoutes from './modules/announcement/announecment.routes';
import coachesRoutes from './modules/coach/coach.routes';

const app: Express = express();
const PORT = process.env.PORT || 5000;
config();

app.use(express.json());
app.use(expressContext());

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.use('/auth', authRoutes);
app.use('/checkIn', checkInRoutes);
app.use('/shareMomentSession', shareMomentSessionRoutes);
app.use('/shareMoment', shareMomentRoutes);
app.use('/announcements', announcementRoutes);
app.use('/coaches', coachesRoutes);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
