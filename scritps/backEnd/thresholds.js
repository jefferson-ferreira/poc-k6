import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: [{ threshold: 'p(95) < 260', abortOnFail: true, delayAbortEval: '10s' }],
        checks: ['rate > 0.99']
    }
}

export default function () {
    const res = http.get('http://test.k6.io/')

    check(res, {
        'Status code é 200': (r) => r.status === 200
    });
}

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}