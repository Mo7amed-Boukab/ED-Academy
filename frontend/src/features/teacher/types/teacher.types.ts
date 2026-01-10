export interface TeacherClass {
    id: string;
    name: string;
    level?: string;
    academicYear?: string;
    createdAt: string;
    _count?: {
        students: number;
    };
    subjects?: TeacherSubject[];
}

export interface TeacherSubject {
    id: string;
    name: string;
}

export interface TeacherClassFilters {
    search?: string;
    level?: string;
    page?: number;
    limit?: number;
}

export interface TeacherClassResponse {
    data: TeacherClass[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
