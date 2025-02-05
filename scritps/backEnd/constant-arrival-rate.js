import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import http from 'k6/http';

export const options = {
    scenarios: {
        contacts: {
            executor: 'constant-arrival-rate',
            duration: '30s',
            rate: 30,
            timeUnit: '1s',
            preAllocatedVUs: 50,
        },
    },
};

export default function () {
    http.get('https://test.k6.io/contacts.php');
}

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}