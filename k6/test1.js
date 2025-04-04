import http from 'k6/http';
import { check, sleep } from 'k6';


export let options = {
  stages: [
    { duration: '30s', target: 50 },  // 30초 동안 50명 가상 사용자 부하
    { duration: '1m', target: 100 }, // 1분 동안 100명
    { duration: '30s', target: 0 },  // 30초 동안 0명 (사용자 수를 줄임)
  ],
};

// 엔드포인트 URL
const url = 'http://192.168.0.71:8080/api/database/execute?dbType=ORALCE';

// SQL 쿼리 (단순한 문자열 쿼리)
const sqlQuery = 'select * from orders;';

// 요청 헤더 설정
const params = {
  headers: {
    'Content-Type': 'text/plain', // 요청 본문이 텍스트임을 나타냄
    'accept': '*/*', // 모든 콘텐츠 타입을 받아들임
  },
};

export default function () {
  // HTTP POST 요청 보내기
  const res = http.post(url, sqlQuery, params);

  // 응답 상태 코드 체크 (200 OK 확인)
  check(res, {
    'is status 200': (r) => r.status === 200,
  });

  // 1초간 대기 (지속적인 요청을 보내기 위해)
  sleep(1);
}

