// QueryExecutor.js
import { CONFIG } from './config.js';
import { QueryCacheManager } from './QueryCacheManager.js';

// Query Executor Class : 쿼리 실행 담당
export class QueryExecutor {
    constructor(dbType, sqlQuery) {
        this.dbType = dbType;
        this.sqlQuery = sqlQuery;
    }

    async execute() {
        const cachedResult = QueryCacheManager.getCachedResult(this.dbType, this.sqlQuery);
        if (cachedResult) return cachedResult;

        const result = await this.executeQuery();
        QueryCacheManager.setCachedResult(this.dbType, this.sqlQuery, result);
        return result;
    }

    async executeQuery() {
        const response = await axios.post(
            CONFIG.API_ENDPOINTS.executeSql,
            this.sqlQuery,
            {
                params: { dbType: this.dbType },
                headers: { 'Content-Type': 'text/plain' }
            }
        );
        return response.data;
    }
}
