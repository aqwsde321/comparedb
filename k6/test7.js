import http from 'k6/http';
import { check, sleep } from 'k6';

// 환경 설정
const CONFIG = {
    ENDPOINT: __ENV.API_ENDPOINT || 'http://192.168.0.71:8080/api/database/execute',
    DB_TYPE: __ENV.DB_TYPE || 'ORACLE',   // ORACLE POSTGRES MARIADB
    START_VUS: __ENV.START_VUS || 5,      // 시작 사용자 수
    TARGET_VUS: __ENV.TARGET_VUS || 10,   // 목표 사용자 수
    DURATION: __ENV.DURATION || '60s'      // 각 단계별 지속 시간
};

// HTTP 요청 설정
const REQUEST_PARAMS = {
    headers: {
        'Content-Type': 'text/plain',
        'accept': '*/*',
    },
};

// 랜덤 정수 생성 함수
function randomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 랜덤 실수 생성 함수
function randomFloatBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// 풀 사이즈 테스트를 위한 단계별 부하 증가
export let options = {
    stages: [
        { duration: '30s', target: CONFIG.START_VUS },     // 초기 부하
        { duration: CONFIG.DURATION, target: CONFIG.TARGET_VUS }, // 목표 부하까지 증가
        { duration: CONFIG.DURATION, target: CONFIG.TARGET_VUS }, // 목표 부하 유지
        { duration: '30s', target: 0 },                    // 정리
    ],
    thresholds: {
        http_req_duration: ['p(90)<1000'],  // 응답시간 임계값
        http_req_failed: ['rate<0.01'],    // 에러율 임계값
    },
};

// 테스트 쿼리 - Connection Pool과 Thread Pool 부하 생성용
const TEST_QUERIES = [
    // 1. Query for customers table
    (randomCustomerId, _, __, ___) => `
        SELECT
            customer_id, company_name, contact_name, country
        FROM customers
        WHERE customer_id = ${randomCustomerId}
    `,

    // 2. Query for products table
    (_, randomProductId, __, ___) => `
        SELECT
            product_id, product_name, category, unit_price
        FROM products
        WHERE product_id = ${randomProductId}
    `,

    // 3. Query for orders table
    (_, __, randomOrderId, ___) => `
        SELECT
            order_id, customer_id, order_date, total_amount
        FROM orders
        WHERE order_id = ${randomOrderId}
    `,

    // 4. Query for order_details table
    (_, randomProductId, randomOrderId,  ____) => `
        SELECT
            order_id, product_id, unit_price, quantity
        FROM order_details
        WHERE order_id = ${randomOrderId}
          AND product_id = ${randomProductId}
    `,

    // 5. Join Query for all tables
    (_, __, ___, randomAmount) => `
        SELECT
            o.order_id, o.order_date, o.total_amount,
            c.company_name, c.contact_name, c.country,
            p.product_name, p.category, od.unit_price, od.quantity
        FROM orders o
        JOIN customers c ON o.customer_id = c.customer_id
        JOIN order_details od ON o.order_id = od.order_id
        JOIN products p ON od.product_id = p.product_id
        WHERE o.total_amount > ${randomAmount}
        ORDER BY o.order_date DESC;
    `,

    // 6. Aggregate function for total order amount per customer
    (_, __, ___, randomAmount) => `
        SELECT
            c.customer_id, c.company_name, COUNT(o.order_id) AS total_orders,
            SUM(o.total_amount) AS total_spent
        FROM customers c
        JOIN orders o ON c.customer_id = o.customer_id
        GROUP BY c.customer_id, c.company_name
        HAVING SUM(o.total_amount) > ${randomAmount}
        ORDER BY total_spent DESC
    `,

    // 7. Aggregate function for product popularity
    () => `
        SELECT
            p.product_id, p.product_name, COUNT(od.order_id) AS times_ordered,
            SUM(od.quantity) AS total_quantity_sold
        FROM products p
        JOIN order_details od ON p.product_id = od.product_id
        GROUP BY p.product_id, p.product_name
        ORDER BY total_quantity_sold DESC
    `,

    // 8. Aggregate function for average order value
    (_, __, ___, randomAmount) => `
        SELECT
            customer_id,
            AVG(total_amount) AS average_order_value
        FROM orders
        GROUP BY customer_id
        HAVING AVG(total_amount) > ${randomAmount}
        ORDER BY average_order_value DESC
    `,
];

export default function () {
    const randomCustomerId = randomIntBetween(1, 32);
    const randomProductId = randomIntBetween(1, 34);
    const randomOrderId = randomIntBetween(1, 30);
    const randomAmount = randomFloatBetween(50.0, 1800.0);

    const queryFunc = TEST_QUERIES[randomIntBetween(0, TEST_QUERIES.length - 1)];
    const query = queryFunc(randomCustomerId, randomProductId, randomOrderId, randomAmount);

    const response = http.post(
        `${CONFIG.ENDPOINT}?dbType=${CONFIG.DB_TYPE}`,
        query,
        REQUEST_PARAMS
    );

    const passed = check(response, {
        'is status 200': (r) => r.status === 200,
//        'is response time < 1000ms': (r) => r.timings.duration < 1000,
    });

    if (!passed) {
        console.error(`Failed Query: ${query}`);
    }

    sleep(1); // 짧은 대기
}

