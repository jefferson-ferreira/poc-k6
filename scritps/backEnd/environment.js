import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 2,
    duration: '5s',
}

export default function () {
    const BASE_URL = __ENV.URL;
    const res = http.get(BASE_URL);
    sleep(1);
}

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}