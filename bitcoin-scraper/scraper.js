const puppeteer = require('puppeteer');

async function scrapeBitcoinChart() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://m.netdania.com/commodities/bitcoin-chart', { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
        const chart = document.querySelector('#netDaniaChartContainer'); // Adjust selector if necessary
        return chart ? chart.outerHTML : '';
    });

    await browser.close();
    return data;
}

module.exports = scrapeBitcoinChart;
