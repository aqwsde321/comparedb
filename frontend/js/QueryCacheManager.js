// QueryCacheManager.js
import { CONFIG } from './config.js';

// Query Cache Manager Class : 캐시 관리
export class QueryCacheManager {
    static getSessionKey(dbType, query) {
        const filteredQuery = QueryCacheManager.filterSql(query);
        return CONFIG.STORAGE_PREFIX + dbType + ":" + filteredQuery;
    }

    static filterSql(sql) {
        return sql.trim()
            .replace(/;$/, '')
            .replace(/\s+/g, ' ');
    }

    static getCachedResult(dbType, query) {
        const sessionKey = this.getSessionKey(dbType, query);
        const cached = sessionStorage.getItem(sessionKey);
        return cached ? JSON.parse(cached) : null;
    }

    static setCachedResult(dbType, query, result) {
        const sessionKey = this.getSessionKey(dbType, query);
        sessionStorage.setItem(sessionKey, JSON.stringify(result));
    }
}