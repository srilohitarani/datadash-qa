const { chromium } = require('playwright');

const seeds = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
const BASE_URL = 'https://exam.sanand.workers.dev/tds-2025-01-ga3';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${BASE_URL}?seed=${seed}`;
    console.log(`\n🔍 Scraping: ${url}`);

    await page.goto(url, { waitUntil: 'networkidle' });

    // Extract all numbers from all table cells
    const numbers = await page.$$eval('table td, table th', cells =>
      cells
        .map(cell => cell.innerText.trim())
        .filter(text => /^-?\d+(\.\d+)?$/.test(text))
        .map(Number)
    );

    const seedSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`  Found ${numbers.length} numbers. Seed ${seed} sum: ${seedSum}`);
    grandTotal += seedSum;
  }

  await browser.close();

  console.log('\n========================================');
  console.log(`✅ GRAND TOTAL OF ALL NUMBERS: ${grandTotal}`);
  console.log('========================================');
})();
