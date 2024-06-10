import React, { useState, useEffect } from 'react';
import 'survey-core/defaultV2.min.css';
import * as Survey from 'survey-react';
import Json from '../surveys/questionOne';
import instance from "../../api/axios";

const MySurvey = (props) => {
    const [startTime, setStartTime] = useState(Date.now());
    const [timeSpent, setTimeSpent] = useState({});

    const sendDataServer = async (data) => {
        try {
            const res = await instance.post("/submit-survey", { ...data, time_spent: timeSpent });
            console.log("Response from server:", res);
            return res;
        } catch (err) {
            console.error("Error while sending data to server:", err);
            throw err;
        }
    };

    const onCurrentPageChanged = (sender) => {
        const pageName = sender.currentPage.name;
        const timeOnPage = Date.now() - startTime;

        setTimeSpent((prevTimeSpent) => ({
            ...prevTimeSpent,
            [pageName]: timeOnPage,
        }));

        setStartTime(Date.now());
    };

    useEffect(() => {
        Survey.StylesManager.applyTheme("defaultV2");
    }, []);

    return (
        <Survey.Survey
            showCompletePage={false}
            onComplete={async (data) => {
                console.log("onComplete called with data:", data.valuesHash);
                try {
                    await sendDataServer(data.valuesHash);
                    if (props.showCompletePage && typeof props.showCompletePage === 'function') {
                        props.showCompletePage();
                    } else {
                        console.error('props.showCompletePage is not a function');
                    }
                } catch (error) {
                    console.error("Error in onComplete:", error);
                }
            }}
            onCurrentPageChanged={onCurrentPageChanged}
            json={Json}
        />
    );
};

export default MySurvey;
