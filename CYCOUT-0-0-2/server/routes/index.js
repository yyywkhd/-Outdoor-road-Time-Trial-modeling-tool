var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/team', (req, res) => {
  const CYCOUT5team = [
      {id: 1, Name: 'Wendy', Team: 'frontend'},
      {id: 2, Name: 'Sim', Team: 'frontend'},
      {id: 3, Name: 'Kayley', Team: 'frontend'},
      {id: 4, Name: 'Marine', Team: 'frontend'},
      {id: 5, Name: 'Long', Team: 'backend'},
      {id: 6, Name: 'Zac', Team: 'backend'},
      {id: 7, Name: 'Waiton', Team: 'backend'},
      {id: 8, Name: 'Chi', Team: 'backend'},
      {id: 9, Name: 'Dong', Team: 'backend'},
  ];

  res.json(CYCOUT5team);
});

module.exports = router;
