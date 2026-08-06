import { useEffect, useRef, useState } from "react";

import {
    chatWithDocument,
    getChatHistory,
    clearChatHistory,
} from "../../services/historyService";

import loadingMessages from "./loadingMessages";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

import ConfirmModal from "../common/ConfirmModal";

import { toast } from "react-toastify";


function ChatBox({ documentId }) {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const [clearing, setClearing] = useState(false);

    const [showConfirm, setShowConfirm] = useState(false);

    const [loadingText, setLoadingText] = useState(
        loadingMessages[0]
    );

    const messagesRef = useRef(null);


    // ==========================
    // Auto Scroll
    // ==========================

    useEffect(() => {

        if (messagesRef.current) {

            messagesRef.current.scrollTop =
                messagesRef.current.scrollHeight;

        }

    }, [messages, loading]);


    // ==========================
    // Load Previous Chat
    // ==========================

    useEffect(() => {

        loadChatHistory();

    }, [documentId]);


    const loadChatHistory = async () => {

        try {

            const history =
                await getChatHistory(documentId);

            setMessages(history);

        }

        catch (error) {

            console.error(error);

        }

    };


    // ==========================
    // Loading Animation
    // ==========================

    useEffect(() => {

        if (!loading) return;

        let index = 0;

        const interval = setInterval(() => {

            index =
                (index + 1) %
                loadingMessages.length;

            setLoadingText(
                loadingMessages[index]
            );

        }, 1800);


        return () =>
            clearInterval(interval);

    }, [loading]);


    // ==========================
    // Send Message
    // ==========================

    const handleSend = async () => {

        if (
            !question.trim() ||
            loading
        ) {
            return;
        }


        const currentQuestion =
            question;


        // Show user message instantly

        setMessages((prev) => [

            ...prev,

            {

                sender: "user",

                message: currentQuestion,

            },

        ]);


        setQuestion("");


        try {

            setLoading(true);

            setLoadingText(
                loadingMessages[0]
            );


            await chatWithDocument(

                documentId,

                currentQuestion

            );


            // Reload chat from database

            const history =
                await getChatHistory(
                    documentId
                );

            setMessages(history);

        }

        catch (error) {

            console.error(error);


            setMessages((prev) => [

                ...prev,

                {

                    sender: "ai",

                    message:
                        "❌ Sorry, something went wrong.",

                },

            ]);

        }

        finally {

            setLoading(false);

        }

    };


    // ==========================
    // Clear Conversation
    // ==========================

    const clearChat = () => {

        setShowConfirm(true);

    };


    const handleClearChat = async () => {

        try {

            setClearing(true);

            await clearChatHistory(
                documentId
            );

            setMessages([]);

            setShowConfirm(false);

            toast.success(
                "Conversation cleared successfully!"
            );

        }

        catch (error) {

            console.error(error);

            toast.error(
                "Failed to clear conversation."
            );

        }

        finally {

            setClearing(false);

        }

    };


    return (

        <div
            className="
                w-full
                mt-8
                sm:mt-12
                overflow-hidden
                rounded-2xl
                sm:rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-xl
                shadow-slate-200/50
                transition-colors
                duration-300

                dark:border-white/10
                dark:bg-[#18181b]
                dark:shadow-none
            "
        >

            {/* Chat Header */}

            <ChatHeader
                hasMessages={
                    messages.length > 0
                }
                onClear={clearChat}
            />


            {/* Chat Messages */}

            <ChatMessages
                messages={messages}
                loading={loading}
                loadingText={loadingText}
                messagesRef={messagesRef}
            />


            {/* Chat Input */}

            <ChatInput
                question={question}
                setQuestion={setQuestion}
                handleSend={handleSend}
                loading={loading}
            />


            {/* Clear Conversation Modal */}

            <ConfirmModal
                open={showConfirm}
                title="Clear Conversation"
                message="Are you sure you want to permanently delete this conversation? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                loading={clearing}
                onCancel={() =>
                    setShowConfirm(false)
                }
                onConfirm={handleClearChat}
            />

        </div>

    );

}

export default ChatBox;