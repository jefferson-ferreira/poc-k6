import { check } from 'k6';
import { chromium } from 'k6/experimental/browser';

export const options = {
    scenarios: {
        ui: {
            executor: 'constant-vus',
            vus: 3,
            duration: '10s',
            options: {
                browser: {
                    type: 'chromium',
                }
            }
        }
    },
    thresholds: {
        checks: ['rate == 1.0'],
        browser_web_vital_fid: ['p(75) <= 100'],
        browser_web_vital_lcp: ['p(75) <= 2500'],
    },
    summaryTrendStats: ['min', 'med', 'avg', 'max', 'p(75)', 'p(95)', 'p(99)'],
};

// Dados de teste
const TEST_DATA = {
    url: 'https://test.k6.io/my_messages.php',
    username: 'admin',
    password: '123'
};

export default async function () {
    const browser = chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {

        // Navegação
        await page.goto(TEST_DATA.url);

        // Login
        await page.locator('input[name="login"]').type(TEST_DATA.username);
        await page.locator('input[name="password"]').type(TEST_DATA.password);
        await page.locator('input[type="submit"]').click();

        // Validação
        check(page, {
            header: (p) => p.locator('h2').textContent == 'Welcome, admin!',
        })
    } finally {
        await page.close();
        await browser.close();
    }
}