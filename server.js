require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('.'));

// Live Matches Fetching with Error Handling
app.get('/matches', async (req, res) => {
    try {
        const apiKey = process.env.API_KEY.trim();
        const response = await axios.get(`https://api.cricketdata.org/v1/currentMatches?apikey=${apiKey}`);
        
        if (response.data.status !== "success") {
            return res.json({ status: "dummy", data: [
                { id: "1", name: "India vs Pakistan (Live Dummy)", status: "Match starting soon..." },
                { id: "2", name: "Australia vs England (Live Dummy)", status: "In Progress" }
            ]});
        }
        res.json(response.data);
    } catch (error) {
        // API failed aana namma dummy matches-ah kaattuvom (testing-kku)
        res.json({ status: "dummy", data: [
            { id: "1", name: "India vs Pakistan (Live Dummy)", status: "Match starting soon..." },
            { id: "2", name: "Australia vs England (Live Dummy)", status: "In Progress" }
        ]});
    }
});

app.listen(PORT, () => {
    console.log(`✅ Professional Server live at http://localhost:${PORT}`);
});