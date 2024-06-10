const express = require("express");
const SurveyController = require("../controllers/surveyController");
const router = express.Router();

router.post("/submit-survey" , SurveyController.submitSurvey);
router.get("/survey-responses", SurveyController.getSurveyResponses);

module.exports = router;