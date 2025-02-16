import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { sleep } from 'k6';
import http from 'k6/http';

export const options = {
    scenarios: {
        contacts: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 200,
            maxDuration: '30s',
        },
    },
};

export default function () {
    http.get('https://test.k6.io/contacts.php');
    sleep(0.5);
}

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}