
var express = require('express');
let router = express.Router();

let QueryController = require('../controller/query.controller');
router.post('/query', QueryController.newQuery);
router.get('/query', QueryController.queries);


let StudentController = require('../controller/student.controller');
router.post('/student', StudentController.Register);
router.get('/student', StudentController.getStudents);
module.exports = router
