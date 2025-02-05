import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 300'],
    },
    cloud: {
        name: 'POC K6 Cloud',
        projectID: '3744868',
    }
}

export default function () {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';
    const res = http.get(BASE_URL);
    check(res, {
        'status code 200': (r) => r.status === 200,
    });

    sleep(1);
}