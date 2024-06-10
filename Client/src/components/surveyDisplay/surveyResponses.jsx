import React, { useEffect, useState } from 'react';
import instance from "../../api/axios";
import './surveyResponse.css';

// Funcion para formatear tiempo en milisegundos a minutos y segundos
const formatTimeSpent = (timeSpent) => {
    const timeSpentObj = JSON.parse(timeSpent);
    return Object.entries(timeSpentObj).map(([page, time]) => {
        if (isNaN(time) || time < 0) {
            return `${page}: Invalid time`;
        }
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${page}: ${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;
    }).join(", ");
};

// Funcion para formatear fecha a un formato legible
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // formato YYYY-MM-DD
};

const SurveyResponses = () => {
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const res = await instance.get("/survey-responses");
                setResponses(res.data);
            } catch (error) {
                console.error("Error fetching survey responses:", error);
            }
        };

        fetchResponses();
    }, []);

    return (
        <div className="table-container">
            <h1>Survey Responses</h1>
            {responses.length > 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Image Choice</th>
                                <th>Brand Choice</th>
                                <th>Time Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responses.map(response => (
                                <tr key={response.id}>
                                    <td>{response.id}</td>
                                    <td>{response.gender}</td>
                                    <td>{response.age}</td>
                                    <td>{response.image_choice}</td>
                                    <td>{response.brand_choice}</td>
                                    <td>{formatTimeSpent(response.time_spent)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="message">Thanks for completing the Neurologica survey!</p>
                </>
            ) : (
                <p>No responses found.</p>
            )}
        </div>
    );
};

export default SurveyResponses;

