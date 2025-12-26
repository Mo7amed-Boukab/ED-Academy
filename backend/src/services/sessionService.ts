import prisma from '../config/prismaClient';
import ApiError from '../utils/ApiError';
import type { Prisma } from '../generated/prisma/client';
import { CreateSessionDto, UpdateSessionDto } from '../dtos/session.dto';

export async function createSession(data: CreateSessionDto) {
    // Verify constraints
    const subject = await prisma.subject.findUnique({ where: { id: data.subjectId } });
    if (!subject) throw ApiError.notFound('Subject not found');

    if (subject.classId !== data.classId) {
        throw ApiError.badRequest('Subject does not belong to this class');
    }

    // Verify Teacher
    if (!data.teacherId) throw ApiError.badRequest('Teacher ID is required');
    const teacher = await prisma.user.findUnique({ where: { id: data.teacherId } });
    if (!teacher || teacher.role !== 'TEACHER') throw ApiError.badRequest('Invalid teacher ID');

    return prisma.session.create({
        data: {
            date: new Date(data.date),
            classId: data.classId,
            subjectId: data.subjectId,
            teacherId: data.teacherId!
        }
    });
}

export async function getAllSessions(filters?: { classId?: string; teacherId?: string; subjectId?: string; date?: string }) {
    const where: Prisma.SessionWhereInput = {};
    if (filters?.classId) where.classId = filters.classId;
    if (filters?.teacherId) where.teacherId = filters.teacherId;
    if (filters?.subjectId) where.subjectId = filters.subjectId;

    if (filters?.date) {
        const startOfDay = new Date(filters.date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(filters.date);
        endOfDay.setHours(23, 59, 59, 999);

        where.date = {
            gte: startOfDay,
            lte: endOfDay
        };
    }

    return prisma.session.findMany({
        where,
        include: {
            class: { select: { id: true, name: true } },
            subject: { select: { id: true, name: true } },
            teacher: { select: { id: true, fullName: true } }
        },
        orderBy: { date: 'asc' }
    });
}

export async function updateSession(id: string, data: UpdateSessionDto, requesterId: string) {
    const session = await prisma.session.findUnique({ where: { id } });
    if (!session) throw ApiError.notFound('Session not found');

    // Strict Authorization: Only the owner Teacher can update
    if (session.teacherId !== requesterId) {
        throw ApiError.forbidden('You can only manage your own sessions');
    }

    return prisma.session.update({
        where: { id },
        data: {
            ...(data.date && { date: new Date(data.date) }),
            ...(data.teacherId && { teacherId: data.teacherId })
        }
    });
}

export async function deleteSession(id: string, requesterId: string) {
    const session = await prisma.session.findUnique({ where: { id } });
    if (!session) throw ApiError.notFound('Session not found');

    // Strict Authorization: Only the owner Teacher can delete
    if (session.teacherId !== requesterId) {
        throw ApiError.forbidden('You can only delete your own sessions');
    }

    await prisma.session.delete({ where: { id } });
}
