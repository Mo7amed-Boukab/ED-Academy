import { api } from "../../../api/axios";

export interface AttendanceStudent {
    id: string;
    attendanceId?: string; // Optional if not marked yet
    name: string;
    email: string;
    status: "PRESENT" | "ABSENT" | "LATE" | null; // Null means not marked
    justification: "justified" | "not_justified" | null;
}

export interface AttendanceSession {
    id: string;
    time: string;
    date: string;
    subject: string;
    class: string;
    level: string;
    students: AttendanceStudent[];
}

export interface MarkAttendanceRecord {
    studentId: string;
    status: "PRESENT" | "ABSENT" | "LATE";
    justification?: "JUSTIFIED" | "NOT_JUSTIFIED";
}

export const attendanceService = {
    /**
     * Get teacher's sessions with attendance
     */
    async getTeacherAttendance(date?: string, teacherId?: string): Promise<AttendanceSession[]> {
        const params = new URLSearchParams();
        if (date) params.append("date", date);
        if (teacherId) params.append("teacherId", teacherId);

        const response = await api.get<any>(`/attendance/my-sessions?${params.toString()}`);
        return response.data.data;
    },

    /**
     * Get attendance for a specific session
     */
    async getSessionAttendance(sessionId: string): Promise<any[]> {
        const response = await api.get<any>(`/attendance/${sessionId}`);
        return response.data.data;
    },

    /**
     * Mark attendance for a session
     */
    async markAttendance(sessionId: string, records: MarkAttendanceRecord[]): Promise<any> {
        const response = await api.post<any>(`/attendance/${sessionId}`, { records });
        return response.data.data;
    },

    /**
     * Update justification for an attendance record
     */
    async updateJustification(
        attendanceId: string,
        justification: "JUSTIFIED" | "NOT_JUSTIFIED"
    ): Promise<any> {
        const response = await api.patch<any>(`/attendance/${attendanceId}/justification`, {
            justification
        });
        return response.data.data;
    },
};
