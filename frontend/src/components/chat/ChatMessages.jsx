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

        <div className="h-[500px] overflow-y-auto bg-black/20 p-6">

            {messages.length === 0 && !loading && (

                <WelcomeScreen />

            )}

            <div className="space-y-5">

                {messages.map((msg, index) => (

                    <ChatMessage
                        key={index}
                        sender={msg.sender}
                        message={msg.message}
                    />

                ))}

                {loading && (

                    <TypingIndicator
                        loadingText={loadingText}
                    />

                )}

                <div ref={bottomRef}></div>

            </div>

        </div>

    );

}

export default ChatMessages;