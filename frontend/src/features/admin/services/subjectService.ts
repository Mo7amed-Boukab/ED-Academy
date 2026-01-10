import { api } from '../../../api/axios';
import type { Subject, CreateSubjectDto, UpdateSubjectDto, SubjectFilters, SubjectResponse } from '../types/subject.types';

export const subjectService = {
    /**
     * Get all subjects with optional filters and pagination
     */
    async getAll(filters?: SubjectFilters): Promise<SubjectResponse> {
        const params = new URLSearchParams();

        if (filters?.classId) params.append('classId', filters.classId);
        if (filters?.teacherId) params.append('teacherId', filters.teacherId);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.page) params.append('page', filters.page.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());

        const response = await api.get<any>(`/subjects?${params.toString()}`);
        return response.data.data;
    },

    /**
     * Get a single subject by ID
     */
    async getById(id: string): Promise<Subject> {
        const response = await api.get<any>(`/subjects/${id}`);
        return response.data.data;
    },

    /**
     * Create a new subject
     */
    async create(data: CreateSubjectDto): Promise<Subject> {
        const response = await api.post<any>('/subjects', data);
        return response.data.data;
    },

    /**
     * Update an existing subject
     */
    async update(id: string, data: UpdateSubjectDto): Promise<Subject> {
        const response = await api.put<any>(`/subjects/${id}`, data);
        return response.data.data;
    },

    /**
     * Delete a subject
     */
    async delete(id: string): Promise<void> {
        await api.delete(`/subjects/${id}`);
    }
};
