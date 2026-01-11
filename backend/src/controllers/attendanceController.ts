import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import { markAttendance, getSessionAttendance, updateAttendanceJustification, getTeacherSessionsAttendance } from '../services/attendanceService';
import { ApiResponse } from '../utils/ApiResponse';
import ApiError from '../utils/ApiError';

export class AttendanceController {
    /**
     * Mark attendance for a session
     * POST /attendance/:sessionId
     */
    static async markAttendance(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { sessionId } = req.params;
            const { records } = req.body;
            const { role, userId } = req.user!;

            const attendance = await markAttendance(sessionId, records, role, userId);
            ApiResponse.success(res, attendance, 'Attendance marked successfully');
        } catch (err: any) {
            next(err instanceof ApiError ? err : ApiError.internal(err.message));
        }
    }

    /**
     * Get attendance for a session
     * GET /attendance/:sessionId
     */
    static async getSessionAttendance(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { sessionId } = req.params;
            const { role, userId } = req.user!;

            const attendance = await getSessionAttendance(sessionId, role, userId);
            ApiResponse.success(res, attendance, 'Attendance retrieved successfully');
        } catch (err: any) {
            next(err instanceof ApiError ? err : ApiError.internal(err.message));
        }
    }

    /**
     * Get all teacher's sessions with attendance
     * GET /attendance/my-sessions
     */
    static async getTeacherAttendance(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { userId, role } = req.user!;
            const { date, teacherId } = req.query;

            // Allow Admin to view any/all attendance
            const targetTeacherId = role === 'TEACHER' ? userId : (teacherId as string | undefined);

            const result = await getTeacherSessionsAttendance(targetTeacherId, date as string | undefined);
            ApiResponse.success(res, result, 'Teacher attendance retrieved successfully');
        } catch (err: any) {
            next(err instanceof ApiError ? err : ApiError.internal(err.message));
        }
    }

    /**
     * Update justification for an attendance record
     * PATCH /attendance/:id/justification
     */
    static async updateJustification(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { justification } = req.body;
            const { role, userId } = req.user!;

            const updated = await updateAttendanceJustification(id, justification, role, userId);
            ApiResponse.success(res, updated, 'Justification updated successfully');
        } catch (err: any) {
            next(err instanceof ApiError ? err : ApiError.internal(err.message));
        }
    }
}
