import { api } from '../../../api/axios';
import type { GlobalStats } from '../types/stats.types';

const BASE_PATH = '/stats';

export const statsApi = {
    async getGlobal(): Promise<GlobalStats> {
        const response = await api.get<any>(`${BASE_PATH}/global`);
        return response.data.data;
    }
};
