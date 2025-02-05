import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import http from 'k6/http';

export const options = {
    scenarios: {
        buscarTodosCrocodilos: {
            executor: 'constant-arrival-rate',
            exec: 'buscarTodosCrocodilos',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preAllocatedVUs: 150,
            gracefulStop: '10s',
            tags: { testType: 'buscarTodosCrocodilos' },
        },
        buscarCrocodiloId: {
            executor: 'per-vu-iterations',
            exec: 'buscarCrocodiloId',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            gracefulStop: '10s',
            tags: { testType: 'buscarCrocodiloId' },
        },
    },
};

export function buscarTodosCrocodilos() {
    http.get(__ENV.URL + 'crocodiles/');
}

export function buscarCrocodiloId() {
    if (__VU % 2 === 0) {
        http.get(__ENV.URL + 'crocodiles/1');
    } else {
        http.get(__ENV.URL + 'crocodiles/2');
    }
}

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}