import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check, group } from "k6";
import http from "k6/http";

export const options = {
    vus: 4,
    duration: "3s",
    tags: {
        name: 'meu-test',
    },
    thresholds: {
        'http_req_duration{tipo:busca-todos-crocodilos}': ['p(95) < 5500'],
    },
}

const id = 7;

export default function () {

    group('exemple post', function () {
        const res = http.get(`https://test-api.k6.io/public/crocodiles/`, {
            tags: {
                tipo: "busca-todos-crocodilos"
            }
        });
        check(res, {
            "status code 200 get all": (r) => r.status === 200
        });
    });

    group('exemple post id', function () {
        const res2 = http.get(`https://test-api.k6.io/public/crocodiles/${id}/`);
        check(res2, {
            "status code 200 get id": (r) => r.status === 200
        });
    });
}

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}