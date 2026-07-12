import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";
import WelcomeScreen from "./WelcomeScreen";

function ChatMessages({

    messages,

    loading,

    loadingText,

    bottomRef,

}) {

    return (

        <div
            className="
                h-[500px]
                overflow-y-auto
                bg-slate-50
                p-6
                transition-colors
                duration-300

                dark:bg-[#111113]
            "
        >

            {/* Welcome Screen */}

            {messages.length === 0 && !loading && (

                <WelcomeScreen />

            )}


            {/* Messages */}

            <div className="space-y-5">

                {messages.map((msg, index) => (

                    <ChatMessage
                        key={index}
                        sender={msg.sender}
                        message={msg.message}
                    />

                ))}


                {/* AI Typing Indicator */}

                {loading && (

                    <TypingIndicator
                        loadingText={loadingText}
                    />

                )}


                {/* Auto Scroll Target */}

                <div ref={bottomRef} />

            </div>

        </div>

    );

}

export default ChatMessages;