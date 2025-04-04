import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// 환경 설정
const CONFIG = {
    ENDPOINT: __ENV.API_ENDPOINT || 'http://192.168.0.71:8080/api/database/execute',
    DB_TYPE: __ENV.DB_TYPE || 'MARIADB'
};

// HTTP 요청 설정
const REQUEST_PARAMS = {
    headers: {
        'Content-Type': 'text/plain',
        'accept': '*/*',
    },
};

// 테스트 옵션 - WAS와 DB 풀 사이즈 테스트에 최적화
export let options = {
    stages: [
        { duration: '2m', target: 10 },   // 워밍업: 2분동안 10명으로 시작
        { duration: '5m', target: 50 },   // 부하증가: 5분동안 50명으로 증가
        { duration: '10m', target: 50 },  // 지속부하: 10분동안 50명 유지
        { duration: '5m', target: 100 },  // 최대부하: 5분동안 100명까지 증가
        { duration: '10m', target: 100 }, // 최대부하 유지: 10분동안 100명 유지
        { duration: '3m', target: 0 },    // 정상화: 3분동안 0명으로 감소
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95%의 요청이 500ms 이내 처리
        http_req_failed: ['rate<0.01'],   // 에러율 1% 미만
    },
};

// 테스트할 쿼리 목록 - CPU와 Connection Pool 부하 테스트를 위한 쿼리들
const TEST_QUERIES = [
    // 1. 단순 조회 (빠른 응답)
    `SELECT * FROM orders LIMIT 100`,
    
    // 2. 조인 쿼리 (중간 부하)
    `SELECT o.*, c.* 
     FROM orders o 
     JOIN customers c ON o.customer_id = c.customer_id 
     LIMIT 50`,
    
    // 3. 그룹화 + 집계 (높은 부하)
    `SELECT customer_id, COUNT(*) as order_count, 
            SUM(total_amount) as total_spent
     FROM orders 
     GROUP BY customer_id`
];

// 메인 테스트 함수
export default function () {
    // 무작위로 쿼리 선택
    const query = TEST_QUERIES[randomIntBetween(0, TEST_QUERIES.length - 1)];
    
    // API 요청
    const url = `${CONFIG.ENDPOINT}?dbType=${CONFIG.DB_TYPE}`;
    const response = http.post(url, query, REQUEST_PARAMS);
    
    // 응답 확인
    check(response, {
        'is status 200': (r) => r.status === 200,
        'is response time < 500ms': (r) => r.timings.duration < 500,
    });

    // 현실적인 사용자 행동 시뮬레이션을 위한 대기
    sleep(randomIntBetween(1, 3));
}
