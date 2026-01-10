import { api } from '../../../api/axios';
import type { TeacherClassResponse, TeacherClassFilters, TeacherClass } from '../types/teacher.types';

export const teacherService = {
    /**
     * Get all classes assigned to the current teacher with optional filters
     */
    async getMyClasses(filters?: TeacherClassFilters): Promise<TeacherClassResponse> {
        const params = new URLSearchParams();

        if (filters?.search) params.append('search', filters.search);
        if (filters?.level) params.append('level', filters.level);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());

        const response = await api.get<any>(`/classes/my-classes?${params.toString()}`);
        return response.data.data;
    },

    /**
     * Get a single class by ID with full details
     */
    async getClassById(id: string): Promise<TeacherClass> {
        const response = await api.get<any>(`/classes/${id}`);
        return response.data.data;
    }
};
