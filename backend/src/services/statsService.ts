import prisma from '../config/prismaClient';
import ApiError from '../utils/ApiError';

export async function getStudentAttendanceRate(studentId: string) {
    const student = await prisma.user.findUnique({ where: { id: studentId } });
    if (!student || student.role !== 'STUDENT') throw ApiError.notFound('Student not found');

    const totalSessions = await prisma.session.count({
        where: { classId: student.classId! }
    });

    if (totalSessions === 0) return { rate: 0, present: 0, absent: 0, total: 0 };

    const attendances = await prisma.attendance.findMany({
        where: { studentId }
    });

    const presentCount = attendances.filter(a => a.status === 'PRESENT').length;
    const lateCount = attendances.filter(a => a.status === 'LATE').length;
    const absentCount = attendances.filter(a => a.status === 'ABSENT').length;

    const rate = ((presentCount + lateCount) / totalSessions) * 100;

    return {
        rate: parseFloat(rate.toFixed(2)),
        present: presentCount + lateCount,
        absent: absentCount + (totalSessions - attendances.length),
        total: totalSessions,
        details: {
            presentStrict: presentCount,
            late: lateCount,
            absentRecorded: absentCount
        }
    };
}

export async function getClassAttendanceStats(classId: string) {
    const classItem = await prisma.class.findUnique({
        where: { id: classId },
        include: { students: true }
    });
    if (!classItem) throw ApiError.notFound('Class not found');

    if (classItem.students.length === 0) return { averageRate: 0, students: [] };

    const stats = await Promise.all(classItem.students.map(async (student) => {
        const studentStat = await getStudentAttendanceRate(student.id);
        return {
            studentId: student.id,
            fullName: student.fullName,
            rate: studentStat.rate
        };
    }));

    const totalRate = stats.reduce((acc, curr) => acc + curr.rate, 0);
    const averageRate = totalRate / stats.length;

    return {
        averageRate: parseFloat(averageRate.toFixed(2)),
        students: stats
    };
}

export async function getGlobalStats() {
    const [totalStudents, totalTeachers, totalClasses, totalSessions] = await Promise.all([
        prisma.user.count({ where: { role: 'STUDENT' } }),
        prisma.user.count({ where: { role: 'TEACHER' } }),
        prisma.class.count(),
        prisma.session.count()
    ]);

    return {
        totalStudents,
        totalTeachers,
        totalClasses,
        totalSessions
    };
}

export async function getTeacherStats(teacherId: string) {
    const classes = await prisma.class.findMany({
        where: { teacherId },
        include: { _count: { select: { students: true } } }
    });
    const totalClasses = classes.length;
    const totalStudents = classes.reduce((acc, c) => acc + c._count.students, 0);

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const todaySessions = await prisma.session.count({
        where: {
            class: { teacherId },
            date: { gte: startOfDay, lt: endOfDay }
        }
    });

    // Determine pending attendance: Sessions in the past (including today) that have NO attendance records
    const pendingAttendance = await prisma.session.count({
        where: {
            class: { teacherId },
            date: { lt: endOfDay },
            attendances: { none: {} }
        }
    });

    return {
        totalClasses,
        totalStudents,
        todaySessions,
        pendingAttendance
    };
}
