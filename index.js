const PORT = 9000;
const axios = require("axios");
const express = require('express');

const app = express();


app.get('/word', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: { count: '5', wordLength: '5' },
    headers: {
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
      'X-RapidAPI-Key': '21866997a5mshc29f5d246e523b5p1207d0jsn5e5034afb1a8'
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