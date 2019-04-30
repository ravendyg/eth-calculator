const express = require('express');
const router = express.Router();

const {calculate} = require('../services/calculator');

router.post('/', function(req, res) {
  const { expression } = req.body;
  if (!expression) {
    res.status(400);
    return res.end();
  }
  try {
    const result = calculate(expression);
    return res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500);
    return res.end();
  }
});

module.exports = router;
