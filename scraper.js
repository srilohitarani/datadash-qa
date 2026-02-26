const { chromium } = require('playwright');

const seeds = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
const BASE_URL = 'https://sanand0.github.io/tdsdata/js_table/?seed=';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${BASE_URL}${seed}`;
    console.log(`Scraping: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });

    // Get all text content and extract numbers
    const bodyText = await page.evaluate(() => document.body.innerText);
    
    const numbers = bodyText
      .split(/\s+/)
      .filter(token => /^-?\d+(\.\d+)?$/.test(token))
      .map(Number);

    const seedSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: found ${numbers.length} numbers, sum = ${seedSum}`);
    grandTotal += seedSum;
  }

  await browser.close();

  console.log('========================================');
  console.log(`GRAND TOTAL: ${grandTotal}`);
  console.log('========================================');
})();
