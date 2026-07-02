import api from "./api";

// ================================
// History
// ================================

export const getHistory = async () => {

    const response = await api.get("/history/");

    return response.data;

};

// ================================
// Document Details
// ================================

export const getDocument = async (id) => {

    const response = await api.get(`/history/${id}/`);

    return response.data;

};

// ================================
// Delete
// ================================

export const deleteDocument = async (id) => {

    const response = await api.delete(
        `/history/${id}/delete/`
    );

    return response.data;

};

// ================================
// Reanalyze
// ================================

export const reanalyzeDocument = async (id) => {

    const response = await api.post(
        `/history/${id}/reanalyze/`
    );

    return response.data;

};

// ================================
// Chat History (NEW)
// ================================

export const getChatHistory = async (id) => {

    const response = await api.get(
        `/history/${id}/chat/`
    );

    return response.data;

};

// ================================
// Clear Chat
// ================================

export const clearChatHistory = async (id) => {

    const response = await api.delete(
        `/history/${id}/chat/`
    );

    return response.data;

};

// ================================
// Chat
// ================================

export const chatWithDocument = async (
    id,
    question
) => {

    const response = await api.post(
        `/history/${id}/chat/`,
        {
            question,
        }
    );

    return response.data;

};