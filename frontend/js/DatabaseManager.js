// DatabaseManager.js
import { CONFIG } from './config.js';

// Database Manager Class : DB 목록 관리
export class DatabaseManager {
    constructor() {
        this.dbList = [];
    }

    async loadDbList() {
        await this.setDbList();
        return this.dbList;
    }

    async setDbList() {
        try {
            //console.log(CONFIG.API_ENDPOINTS.getDbList)
            const response = await axios.get(CONFIG.API_ENDPOINTS.getDbList);
            this.dbList = response.data;
        } catch (error) {
            console.error('Error fetching DB list:', error);
            throw error;
        }
    }
}
