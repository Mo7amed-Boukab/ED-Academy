export interface Session {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  class: {
    id: string;
    name: string;
  };
  subject: {
    id: string;
    name: string;
  };
  teacher: {
    id: string;
    fullName: string;
  };
}

export interface CreateSessionDto {
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  classId: string;
  subjectId: string;
}

export interface UpdateSessionDto {
  date?: string;
  startTime?: string;
  endTime?: string;
  room?: string;
  classId?: string;
  subjectId?: string;
}

export interface SessionFilters {
  classId?: string;
  teacherId?: string;
  subjectId?: string;
  date?: string;
  page?: number;
  limit?: number;
}

export interface SessionResponse {
  data: Session[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
