
var express = require('express');
let router = express.Router();

let QueryController = require('../controller/query.controller');
router.post('/query', QueryController.newQuery);
router.get('/query', QueryController.queries);


let StudentController = require('../controller/student.controller');
router.post('/student', StudentController.Register);
router.get('/student', StudentController.getStudents);


let TutorController = require('../controller/tutor.controller');
router.post('/tutor', TutorController.Register);
router.get('/tutor', TutorController.getTutors);


let LoginController = require('../controller/login.controller');
router.get('/isLogin', LoginController.isUserLogin);
router.post('/signup', LoginController.signUp);
router.get('/login', LoginController.login());
router.get('/logout', LoginController.logout);
router.get('/redirecto', LoginController.redirecto);

module.exports = router
