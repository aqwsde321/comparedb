import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// 환경 설정
const CONFIG = {
    ENDPOINT: __ENV.API_ENDPOINT || 'http://192.168.0.71:8080/api/database/execute',
    START_VUS: __ENV.START_VUS || 10,
    TARGET_VUS: __ENV.TARGET_VUS || 50,
    DURATION: __ENV.DURATION || '30s'
};

// HTTP 요청 설정
const REQUEST_PARAMS = {
    headers: {
        'Content-Type': 'text/plain',
        'accept': '*/*',
    },
};

// 테스트 쿼리 함수들
const TEST_QUERIES = [
    // 1. 단순 조회
    (customerId) => `
        SELECT * FROM customers 
        WHERE customer_id = ${customerId}
    `,
    
    // 2. 주문 조회 (조인)
    (customerId, orderId) => `
        SELECT o.*, c.* 
        FROM orders o 
        JOIN customers c ON o.customer_id = c.customer_id 
        WHERE c.customer_id = ${customerId} 
        OR o.order_id = ${orderId}
        LIMIT 100
    `,
    
    // 3. 주문 상세 (중첩 조인)
    (orderId, productId) => `
        SELECT o.*, od.*, p.* 
        FROM orders o 
        JOIN order_details od ON o.order_id = od.order_id 
        JOIN products p ON od.product_id = p.product_id 
        WHERE o.order_id = ${orderId} 
        OR p.product_id = ${productId}
        LIMIT 50
    `
];

// 시나리오별 설정
export let options = {
    scenarios: {
        postgres_test: {
            executor: 'ramping-vus',
            exec: 'testPostgres',
            startVUs: CONFIG.START_VUS,
            stages: [
                { duration: '30s', target: CONFIG.START_VUS },
                { duration: CONFIG.DURATION, target: CONFIG.TARGET_VUS },
                { duration: '30s', target: 0 }
            ],
            tags: { db_type: 'POSTGRES' },
        },
        oracle_test: {
            executor: 'ramping-vus',
            exec: 'testOracle',
            startVUs: CONFIG.START_VUS,
            stages: [
                { duration: '30s', target: CONFIG.START_VUS },
                { duration: CONFIG.DURATION, target: CONFIG.TARGET_VUS },
                { duration: '30s', target: 0 }
            ],
            tags: { db_type: 'ORACLE' },
            startTime: '2m', // PostgreSQL 테스트 후 시작
        },
        mariadb_test: {
            executor: 'ramping-vus',
            exec: 'testMariaDB',
            startVUs: CONFIG.START_VUS,
            stages: [
                { duration: '30s', target: CONFIG.START_VUS },
                { duration: CONFIG.DURATION, target: CONFIG.TARGET_VUS },
                { duration: '30s', target: 0 }
            ],
            tags: { db_type: 'MARIADB' },
            startTime: '4m', // Oracle 테스트 후 시작
        },
    },
    thresholds: {
        'http_req_duration{db_type:POSTGRES}': ['p(95)<500'],
        'http_req_duration{db_type:ORACLE}': ['p(95)<500'],
        'http_req_duration{db_type:MARIADB}': ['p(95)<500'],
        'http_req_failed': ['rate<0.01'],
    },
};

// 데이터베이스 요청 함수
function sendDatabaseRequest(dbType) {
    const randomCustomerId = randomIntBetween(1, 35);
    const randomProductId = randomIntBetween(1, 35);
    const randomOrderId = randomIntBetween(1, 35);
    
    // 랜덤 쿼리 선택 및 실행
    const queryFunc = TEST_QUERIES[randomIntBetween(0, TEST_QUERIES.length - 1)];
    const query = queryFunc(randomCustomerId, randomOrderId, randomProductId);
    
    const response = http.post(
        `${CONFIG.ENDPOINT}?dbType=${dbType}`,
        query,
        {
            ...REQUEST_PARAMS,
            tags: { db_type: dbType }
        }
    );
    
    check(response, {
        [`is status 200 (${dbType})`]: (r) => r.status === 200,
        [`is response time < 500ms (${dbType})`]: (r) => r.timings.duration < 500,
    });
}

// 데이터베이스별 테스트 함수
export function testPostgres() {
    sendDatabaseRequest('POSTGRES');
    sleep(0.1);
}

export function testOracle() {
    sendDatabaseRequest('ORACLE');
    sleep(0.1);
}

export function testMariaDB() {
    sendDatabaseRequest('MARIADB');
    sleep(0.1);
}
