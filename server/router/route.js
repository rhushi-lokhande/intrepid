
var express = require('express');
let router = express.Router();

let QueryController = require('../controller/query.controller');
router.post('/query', QueryController.newQuery);
router.get('/query', QueryController.queries);

module.exports = router
