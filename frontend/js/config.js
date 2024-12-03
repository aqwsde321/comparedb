// config.js
const ORIGIN = 'https://allcomparedb-latest.onrender.com';
//const ORIGIN = 'http://localhost:8080';
export const CONFIG = {
    ORIGIN,
    API_ENDPOINTS: {
        executeSql: new URL('/api/database/execute', ORIGIN).toString(),
        getDbList: new URL('/api/database/db-list', ORIGIN).toString()
    },
    STORAGE_PREFIX: 'sql_cache:'
};
