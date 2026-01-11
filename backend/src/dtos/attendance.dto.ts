import { AttendanceStatus, Justification } from '../generated/prisma/client';

export interface AttendanceRecordDto {
    studentId: string;
    status: AttendanceStatus;
    justification?: Justification;
}

export interface MarkAttendanceDto {
    records: AttendanceRecordDto[];
}

export interface UpdateJustificationDto {
    justification: 'JUSTIFIED' | 'NOT_JUSTIFIED';
}
