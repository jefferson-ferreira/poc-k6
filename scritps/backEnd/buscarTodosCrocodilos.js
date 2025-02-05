import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '30s',
    thresholds: {
        checks: ['rate > 0.99']
    }
}

export default function () {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';
    const res = http.get(BASE_URL);
    check(res, {
        'status code 200': (r) => r.status === 200,
    });
}

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}