import { 
    TARGET_ORIGIN, 
    LOG_RECEIVED_MESSAGES, 
    MESSAGE_STYLE, 
    ANIMATION_DURATION,
    MAX_MESSAGES,
    CLEAR_INPUT_AFTER_SEND,
    BUTTON_TEXT,
    INPUT_PLACEHOLDER,
    TIMESTAMP_FORMAT
} from './config.js';

// DOM elements
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messagesContainer');

// Initialize the page
function init() {
    // Set up the button text and input placeholder from config
    sendButton.textContent = BUTTON_TEXT;
    messageInput.placeholder = INPUT_PLACEHOLDER;
    
    // Add event listeners
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') sendMessage();
    });
    
    // Listen for messages from parent window
    window.addEventListener('message', receiveMessage);
    
    // Notify parent that iframe is ready
    sendReadyMessage();
}

// Send message to parent window
function sendMessage() {
    const message = messageInput.value.trim();
    if (!message) return;
    
    const messageData = {
        type: 'userMessage',
        data: message,
        timestamp: new Date().toISOString()
    };
    
    // Post message to parent
    window.parent.postMessage(messageData, TARGET_ORIGIN);
    
    if (CLEAR_INPUT_AFTER_SEND) {
        messageInput.value = '';
    }
    
    // Add send indicator to UI
    addMessageToUI(`Sent: ${message}`, true);
}

// Notify parent that iframe is ready
function sendReadyMessage() {
    const readyMessage = {
        type: 'iframeReady',
        timestamp: new Date().toISOString()
    };
    
    window.parent.postMessage(readyMessage, TARGET_ORIGIN);
}

// Handle received messages
function receiveMessage(event) {
    // Security check (can be enhanced for production)
    // For demo we accept all origins, but in production you would check event.origin
    
    const message = event.data;
    
    if (LOG_RECEIVED_MESSAGES) {
        console.log('Received message:', message);
    }
    
    // Process different message types
    if (typeof message === 'object') {
        // Display message in UI
        if (message.data !== undefined) {
            addMessageToUI(`Received: ${message.data}`);
        }
        
        // Handle specific message types if needed
        switch (message.type) {
            case 'parentCommand':
                // Handle parent commands here
                break;
            // Add other message types as needed
        }
    } else {
        // Simple string message
        addMessageToUI(`Received: ${message}`);
    }
}

// Add message to UI
function addMessageToUI(text, isSent = false) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    
    const timestamp = new Date().toLocaleTimeString([], TIMESTAMP_FORMAT);
    
    messageElement.textContent = `[${timestamp}] ${text}`;
    
    // Apply styles from config
    messageElement.style.backgroundColor = isSent ? '#f0f8ff' : MESSAGE_STYLE.backgroundColor;
    messageElement.style.borderLeftColor = MESSAGE_STYLE.borderColor;
    messageElement.style.color = MESSAGE_STYLE.textColor;
    messageElement.style.fontSize = MESSAGE_STYLE.fontSize;
    
    // Apply animation
    messageElement.style.animation = `fadeIn ${ANIMATION_DURATION}ms ease-in`;
    
    // Add message to container
    messagesContainer.prepend(messageElement);
    
    // Limit number of messages
    while (messagesContainer.children.length > MAX_MESSAGES) {
        messagesContainer.removeChild(messagesContainer.lastChild);
    }
}

// Initialize the page when DOM is ready
document.addEventListener('DOMContentLoaded', init);

