import { useCallback, useState } from 'react';
import React from "react";
import MySurvey from "../surveyTypes/surveyTypeOne.jsx";

const SurveyOne = () => {
    const [showPage, setShowPage] = useState(true);

    const onCompletePage = useCallback((data) => {
        console.log(data);
        setShowPage(!showPage);
    }, [showPage]);

    return (
        <div>
            {showPage ? (
                <MySurvey showCompletePage={data => onCompletePage(data)} />
            ) : (
                <div>Thank you for completing the survey.</div>
            )}
        </div>
    );
};

export default SurveyOne;