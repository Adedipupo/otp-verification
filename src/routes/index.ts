import express,{Request,Response} from 'express';
import usersRoute from "./users";


const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Api server is live');
});

router.use('/users', usersRoute);



export default router;
