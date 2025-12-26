import { Router } from 'express';
import { SessionController } from '../controllers/sessionController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.post('/', authorizeRoles(['TEACHER']), SessionController.create);
router.get('/', SessionController.getAll);
router.put('/:id', authorizeRoles(['TEACHER']), SessionController.update);
router.delete('/:id', authorizeRoles(['TEACHER']), SessionController.delete);

export default router;
