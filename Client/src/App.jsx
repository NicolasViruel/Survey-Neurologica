import './App.css';
import { useState } from 'react';
import MySurvey from './components/surveyTypes/surveyTypeOne';
import SurveyResponses from './components/surveyDisplay/surveyResponses';

function App() {
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);

  const handleSurveyComplete = () => {
    setIsSurveyCompleted(true);
  };

  return (
    <div className='App'>
      <main>
        {isSurveyCompleted ? (
          <SurveyResponses />
        ) : (
          <MySurvey showCompletePage={handleSurveyComplete} />
        )}
      </main>
    </div>
  );
}

export default App;

