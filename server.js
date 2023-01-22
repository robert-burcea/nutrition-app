const express = require('express');
const request = require('request');
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

const edamamId = 'YOUR_APP_ID';
const edamamKey = 'YOUR_APP_KEY';

app.post('/fetch-recipe', (req, res) => {
    const food = req.body.food;
    const edamamId = req.body.appId;
    const edamamKey = req.body.apiKey;
    const url = `https://api.edamam.com/search?q=${food}&app_id=${edamamId}&app_key=${edamamKey}`;
    request(url, (err, response, body) => {
        if (err) {
            return res.send({
                error: err
            });
        }
        const data = JSON.parse(body);
        res.send(data);
    });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
