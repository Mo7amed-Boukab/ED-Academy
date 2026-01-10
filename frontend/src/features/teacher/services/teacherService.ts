import { api } from "../../../api/axios";
import type {
  TeacherClassResponse,
  TeacherClassFilters,
  TeacherClass,
} from "../types/teacher.types";
import type {
  SessionResponse,
  SessionFilters,
  Session,
  CreateSessionDto,
  UpdateSessionDto,
} from "../types/session.types";

export const teacherService = {
  /**
   * Get all classes assigned to the current teacher with optional filters
   */
  async getMyClasses(
    filters?: TeacherClassFilters
  ): Promise<TeacherClassResponse> {
    const params = new URLSearchParams();

    if (filters?.search) params.append("search", filters.search);
    if (filters?.level) params.append("level", filters.level);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await api.get<any>(
      `/classes/my-classes?${params.toString()}`
    );
    return response.data.data;
  },

  /**
   * Get a single class by ID with full details
   */
  async getClassById(id: string): Promise<TeacherClass> {
    const response = await api.get<any>(`/classes/${id}`);
    return response.data.data;
  },

  /**
   * Get all sessions with optional filters
   */
  async getSessions(filters?: SessionFilters): Promise<SessionResponse> {
    const params = new URLSearchParams();

    if (filters?.classId) params.append("classId", filters.classId);
    if (filters?.subjectId) params.append("subjectId", filters.subjectId);
    if (filters?.date) params.append("date", filters.date);
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());

    const response = await api.get<any>(`/sessions?${params.toString()}`);
    return response.data.data;
  },

  /**
   * Create a new session
   */
  async createSession(data: CreateSessionDto): Promise<Session> {
    const response = await api.post<any>("/sessions", data);
    return response.data.data;
  },

  /**
   * Update an existing session
   */
  async updateSession(id: string, data: UpdateSessionDto): Promise<Session> {
    const response = await api.put<any>(`/sessions/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a session
   */
  async deleteSession(id: string): Promise<void> {
    await api.delete(`/sessions/${id}`);
  },
};
