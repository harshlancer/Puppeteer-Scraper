const express = require('express');
const { scrapeStockMarketNews } = require('./scraper');

const app = express();
const port = 3000;

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Stock Market News API. Visit /api/stock-news to get the latest news.');
});

// Endpoint to fetch scraped stock market news
app.get('/api/stock-news', async (req, res) => {
    try {
        const news = await scrapeStockMarketNews();
        res.json(news);
    } catch (error) {
        console.error('Error fetching stock market news:', error);
        res.status(500).json({ error: 'Failed to fetch stock market news' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
