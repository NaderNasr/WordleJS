require('dotenv').config();
const axios = require("axios");
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 9000;

app.use(cors());

app.get('/word', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: { count: '5', wordLength: '5' },
    headers: {
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.X_RapidAPI_Key
    }
  };

  axios.request(options).then((response) => {
    console.log(response.data);
    res.json(response.data);
  }).catch((error) => {
    console.error(error);
  });
});




app.listen(PORT, () => (console.log(`SERVER IS RUNNING ON PORT: ${PORT}`)));