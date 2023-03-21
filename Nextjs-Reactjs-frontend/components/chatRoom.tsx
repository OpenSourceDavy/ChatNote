
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import React, { useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator, MessageModel } from '@chatscope/chat-ui-kit-react';


const API_KEY = "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";
const systemMessage = {
    "role": "system", "content": "Explain things as best as you can"
}

interface MessageObject {
    message: string;
    sentTime?: string;
    sender: string;
    direction?: string;
}

const Chatroom: React.FC = () => {
    const [messages, setMessages] = useState<MessageObject[]>([
        {
            message: "Hello, I'm DCHAT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    type MessageDirection = 'incoming' | 'outgoing';
    const handleSend = async (message: string) => {
        const newMessage: MessageObject = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages: MessageObject[]) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return { role: role, content: messageObject.message }
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [systemMessage, ...apiMessages],

        };

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            if (response.body === null) {

                throw new Error("Response body is null");
            }


            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let result = "";
            let done = false;
            while (!done) {
                const { value, done: streamDone } = await reader.read();
                if (streamDone) {
                    done = true;
                } else {
                    result += decoder.decode(value);
                    // Process the streamed data here, e.g., update the UI
                    // You may need to parse the result and extract the relevant information
                }
            }

            const data = JSON.parse(result);
            console.log(data);
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessages([...chatMessages, {
                message: "An error occurred. Please Check your network. Enable VPN if necessary.",
                sender: "ChatGPT"
            }]);
        } finally {
            setIsTyping(false);
        }
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ height: "80vh", width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <MainContainer style={{
                    backgroundColor: '#f2f2f2',
                    borderRadius: '30px',
                    boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.1)',
                    width: '100%',
                    display: 'flex', // Add this line
                    flexGrow: 1, // Add this line
                }}>

                    <ChatContainer style={{
                        backgroundColor: '#fff',
                        borderRadius: '10px',
                        boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.1)',
                        flexGrow: 1, // Add this line
                        // Add this line
                    }}>
                        <MessageList
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #f5f5f5 0%, rgba(63,181,171,0.25) 100%)',
                                borderRadius: '10px',
                                backgroundColor: '#fff',
                                boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.1)',


                            }}
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="he is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                const messageModel: MessageModel = {
                                    message: message.message,
                                    sentTime: message.sentTime,
                                    sender: message.sender,
                                    direction: message.direction as MessageDirection || 'incoming',
                                    position: 'single',
                                };

                                return <Message style={{ borderRadius: '10px' }} key={i} model={messageModel} />;
                            })}
                        </MessageList>
                        <MessageInput style={{
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            padding: '10px',
                            margin: '10px',
                            boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.1)',
                        }} placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>

            </div>




        </div>
    )
}

export default Chatroom;
