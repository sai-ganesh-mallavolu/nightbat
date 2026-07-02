import api from "./api";

// =====================================
// Get Existing Quiz
// =====================================

export const getQuiz = async (documentId) => {

    const response = await api.get(

        `/history/${documentId}/quiz/`

    );

    return response.data;

};

// =====================================
// Generate Quiz
// =====================================

export const generateQuiz = async (documentId) => {

    const response = await api.post(

        `/history/${documentId}/quiz/`

    );

    return response.data;

};

// =====================================
// Save Quiz Attempt
// =====================================

export const saveQuizAttempt = async (

    documentId,

    data

) => {

    const response = await api.post(

        `/history/${documentId}/quiz/attempt/`,

        data

    );

    return response.data;

};

// =====================================
// Get Quiz Attempts
// =====================================

export const getQuizAttempts = async (

    documentId

) => {

    const response = await api.get(

        `/history/${documentId}/quiz/attempts/`

    );

    return response.data;

};