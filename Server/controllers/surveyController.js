const { pool } = require("../database/index");

const submitSurvey = async (req, res) => {
  const { question1, question2, question3, question4, time_spent } = req.body;

    const gender = question1[0];
    const age = question2;
    const image_choice = question3;
    const brand_choice = question4[0];

  try {
    const [result] = await pool.query(
      "INSERT INTO survey_responses (gender, age, image_choice, brand_choice, time_spent) VALUES (?, ?, ?, ?, ?)",
      [gender, age, image_choice, brand_choice, JSON.stringify(time_spent)]
    );
    res.status(200).json({ id: result.insertId });
  } catch (error) {
    console.error("Error inserting data: ", error);
    res.status(500).json({ error: "Error inserting data" });
  }
};


const getSurveyResponses = async (req, res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM survey_responses');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching data ", error);
        res.status(500).json( {errir:"Errir fetching data"} );
    }
};

module.exports = {
  submitSurvey,
  getSurveyResponses
};
