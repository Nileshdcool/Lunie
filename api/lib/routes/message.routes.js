const { getInboxMessage } = require("../controller/messages");

var express = require('express');
var router = express.Router();

router.use('/', async function (_req, res) {
  try {
   const message = await getInboxMessage();
    res.status(200).send({message});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;