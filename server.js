require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs/promises');
const path = require('path');
const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY;
const CACHE_DIR = path.join(__dirname, 'cache');

// Ensure the cache directory exists
fs.mkdir(CACHE_DIR, { recursive: true });

// Serve static files from the current directory
app.use(express.static(__dirname));

// Proxy endpoint
app.get('/api/data', async (req, res) => {
    const { symbol, from, to } = req.query;
    if (!symbol || !from) {
        return res.status(400).json({ error: 'Symbol and from parameters are required' });
    }

    const effectiveTo = to || from;
    const cacheFilePath = path.join(CACHE_DIR, `${symbol}_${from}_${effectiveTo}.json`);

    // 1. Try to serve from cache
    try {
        const cachedData = await fs.readFile(cacheFilePath, 'utf-8');
        console.log(`Serving from cache for: ${symbol} from ${from} to ${effectiveTo}`);
        return res.json(JSON.parse(cachedData));
    } catch (error) {
        // If file doesn't exist, proceed to fetch from API
        console.log(`No cache found for: ${symbol} from ${from} to ${effectiveTo}. Fetching from API.`);
    }

    // 2. If not in cache, fetch from API
    const apiUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${from}&to=${effectiveTo}&apikey=${API_KEY}`;

    try {
        const apiRes = await fetch(apiUrl);
        const data = await apiRes.json();

        // Check for API error response before caching
        if (data['Error Message']) {
            console.error('API Error:', data['Error Message']);
            return res.status(500).json({ error: 'Failed to fetch valid data from the external API', details: data['Error Message'] });
        }

        // 3. Save to cache
        await fs.writeFile(cacheFilePath, JSON.stringify(data, null, 2));
        console.log(`Saved to cache: ${symbol} from ${from} to ${effectiveTo}`);

        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch data from the external API' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});