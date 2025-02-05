import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
    stages: [
        { duration: '10s', target: 10 }],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 6000'],
    }
}

export default function () {
    const BASE_URL = "https://test-api.k6.io";
    const USER = `${Math.random()}@mail.com`;
    const PASS = 'user123';
    console.log(`Usuário: ${USER} - Senha: ${PASS}`);
    const res = http.post(`${BASE_URL}/user/register/`, {
        username: USER,
        first_name: 'Crocodilo',
        last_name: 'Dino',
        email: USER,
        password: PASS,
    });
    check(res, {
        'Sucesso ao registrar': (r) => r.status === 201,
    });

    sleep(1);
}

export function handleSummary(data) {
    return {
        "report.html": htmlReport(data),
    };
}