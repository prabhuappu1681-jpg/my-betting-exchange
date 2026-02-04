const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname)));

// API KEY Render Environment Variables-la irundhu edukkum
const API_KEY = process.env.API_KEY || '486acfbf-ddbc-4a77-9543-3e65fad70a9b';

// 1. Matches Fetch Pannum (Upcoming & Live)
app.get('/matches', async (req, res) => {
    try {
        // 'matches' endpoint use panna thaan upcoming matches list varum
        const response = await axios.get(`https://api.cricketdata.org/v1/matches?apikey=${API_KEY.trim()}&offset=0`);
        
        if (response.data && response.data.data) {
            res.json(response.data);
        } else {
            // Data illana Dummy data (Testing-kku)
            res.json({
                data: [
                    { name: "RCB vs DC (Feb 5) - Real Data Loading...", status: "Upcoming", id: "dummy1" },
                    { name: "CSK vs MI (Feb 7) - Real Data Loading...", status: "Upcoming", id: "dummy2" }
                ]
            });
        }
    } catch (error) {
        console.error("API Error:", error.message);
        res.json({ error: "API connection issue machi!" });
    }
});

// 2. Score Fetch Pannum
app.get('/score/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://api.cricketdata.org/v1/match_scorecard?apikey=${API_KEY.trim()}&id=${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        res.json({ error: "Score fetch error" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
