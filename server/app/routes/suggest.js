var express = require('express');
var router = express.Router();
var _ = require('lodash');

var axios = require('axios');

const KEY = '24b495e730808e5a0536ac51dd634bd1';
const USER_ID = '441';

router.get('/countries', function (req, res) {
  //const url = `https://ezcmd.com/apps/api_ezhigh/get_countries/${KEY}/${USER_ID}`;
  const url = `https://restcountries.eu/rest/v2/all?fields=name;population;alpha2Code`;

  axios.get(url)
    .then(response => {
      const data = response.data.filter(el => {
        return el.population > 100000000
      })
      
      res.send(data)
    })
    .catch(e => {
      console.log(e);
      res.status(400).send(e)
    })
});

router.get('/cities', function (req, res) {
  const country_code = req.query.country_code;
  const url = `https://ezcmd.com/apps/ajax_apps/get_sd1/${country_code}`;

  axios.get(url)
    .then(response => {
      let data = Object.values(response.data);
      res.send(data)
    })
    .catch(e => res.status(400).send(e))
});


module.exports = router;