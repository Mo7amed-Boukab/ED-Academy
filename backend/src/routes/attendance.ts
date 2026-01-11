import { Router } from 'express';
import { AttendanceController } from '../controllers/attendanceController';
import { authenticateToken, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateToken);

// Teacher gets their sessions with attendance overview
router.get('/my-sessions', authorizeRoles(['TEACHER', 'ADMIN']), AttendanceController.getTeacherAttendance);

// Get attendance for a specific session
router.get('/:sessionId', authorizeRoles(['ADMIN', 'TEACHER']), AttendanceController.getSessionAttendance);

// Mark attendance for a session
router.post('/:sessionId', authorizeRoles(['ADMIN', 'TEACHER']), AttendanceController.markAttendance);

// Update justification for an attendance record
router.patch('/:id/justification', authorizeRoles(['ADMIN', 'TEACHER']), AttendanceController.updateJustification);

export default router;
