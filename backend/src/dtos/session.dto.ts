export interface CreateSessionDto {
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  classId: string;
  subjectId: string;
  teacherId?: string;
}

export interface UpdateSessionDto {
  date?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  classId?: string;
  subjectId?: string;
  teacherId?: string;
}
