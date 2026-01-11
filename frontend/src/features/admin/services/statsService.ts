import { api } from "../../../api/axios";
import type { GlobalStats, TeacherStats } from "../types/stats.types";

export const statsService = {
  async getGlobal(): Promise<GlobalStats> {
    const response = await api.get<any>("/stats/global");
    return response.data.data;
  },

  async getTeacherStats(): Promise<TeacherStats> {
    const response = await api.get<any>("/stats/teacher");
    return response.data.data;
  },
};
