
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch'); // node-fetch is not a built-in module, you might need to install it: npm install node-fetch
const app = express();
const port = 3000;

const API_KEY = process.env.API_KEY;

// Serve static files from the 'public' directory
app.use(express.static(__dirname));

// Proxy endpoint
app.get('/api/data', async (req, res) => {
    const { symbol, from, to } = req.query;
    if (!symbol || !from) {
        return res.status(400).json({ error: 'Symbol and from parameters are required' });
    }

    const effectiveTo = to || from;
    const apiUrl = `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=${from}&to=${effectiveTo}&apikey=${API_KEY}`;

    try {
        const apiRes = await fetch(apiUrl);
        const data = await apiRes.json();
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch data from the external API' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
