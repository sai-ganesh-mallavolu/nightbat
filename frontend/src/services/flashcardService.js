import api from "./api";

export const getFlashcards = async (documentId) => {

    const response = await api.get(
        `/history/${documentId}/flashcards/`
    );

    return response.data;

};

export const generateFlashcards = async (documentId) => {

    const response = await api.post(
        `/history/${documentId}/flashcards/`
    );

    return response.data;

};

export const markFlashcardLearned = async (

    flashcardId,

    isLearned = true

) => {

    const response = await api.patch(

        `/flashcards/${flashcardId}/learn/`,

        {

            is_learned: isLearned,

        }

    );

    return response.data;

};