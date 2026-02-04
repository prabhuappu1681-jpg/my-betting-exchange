const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname)));

// API KEY Render Environment Variables-la irundhu edukkum
const API_KEY = process.env.API_KEY || '486acfbf-ddbc-4a77-9543-3e65fad70a9b';

app.get('/matches', async (req, res) => {
    try {
        const response = await axios.get(`https://api.cricketdata.org/v1/matches?apikey=${API_KEY.trim()}&offset=0`);
        if (response.data && response.data.data) {
            res.json(response.data);
        } else {
            res.json({ data: [] });
        }
    } catch (error) {
        res.json({ data: [] });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
