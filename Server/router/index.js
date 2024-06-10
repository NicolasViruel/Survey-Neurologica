const router = require("express").Router();

//importamos rutas
const surveyRoute =require("../router/surveyRoute");

router.use('/', surveyRoute);

module.exports = router