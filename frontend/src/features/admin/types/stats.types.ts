export interface GlobalStats {
    totalStudents: number;
    totalTeachers: number;
    totalClasses: number;
    totalSessions: number;
}

export interface TeacherStats {
    totalClasses: number;
    totalStudents: number;
    todaySessions: number;
    pendingAttendance: number;
}
