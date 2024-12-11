// index.js
import { QueryContainerManager } from './js/QueryContainerManager.js';
import { DatabaseMenuIconManager } from './js/DatabaseMenuIconManager.js';
import { DatabaseManager } from './js/DatabaseManager.js';

document.addEventListener('DOMContentLoaded', () => {

    const databaseManager = new DatabaseManager();
    databaseManager.loadDbList().then((dbList) => {
        new QueryContainerManager(dbList);
        new DatabaseMenuIconManager(dbList);
    }).catch((error) => {
        console.error('Error loading dbList:', error);
        new QueryContainerManager(["MARIADB", "POSTGRES", "ORACLE"]);
        new DatabaseMenuIconManager(["MARIADB", "POSTGRES", "ORACLE"]);
        alert("현재 서버 작업으로 DB 연결이 안됩니다.");
    });
});


