const express = require('express');
const scrapeBitcoinChart = require('./scraper');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const chartHTML = await scrapeBitcoinChart();
        res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bitcoin Price Chart</title>
        <style>
          #chart {
            width: 100%;
            height: 500px;
          }
        </style>
      </head>
      <body>
        <h1>Bitcoin Price Chart</h1>
        <div id="chart">${chartHTML}</div>
      </body>
      </html>
    `);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

const port = 3001; // Change to an available port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
