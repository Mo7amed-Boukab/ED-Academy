export interface CreateSessionDto {
    date: string;
    classId: string;
    subjectId: string;
    teacherId?: string;
}

export interface UpdateSessionDto {
    date?: string;
    // Usually modifying subject or class of a session is rare/complex, maybe just date?
    // Let's allow simple updates for now.
    teacherId?: string;
}
