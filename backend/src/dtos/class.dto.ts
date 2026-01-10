export interface CreateClassDto {
    name: string;
    level?: string;
    academicYear?: string;
    teacherId?: string; 
}

export interface UpdateClassDto {
    name?: string;
    level?: string;
    academicYear?: string;
    teacherId?: string;
}

export interface AssignTeacherDto {
    teacherId: string;
}
