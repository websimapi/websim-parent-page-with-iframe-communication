import { PARENT_CONFIG } from './parent-config.js';

// DOM elements
const parentMessageInput = document.getElementById('parentMessageInput');
const parentSendButton = document.getElementById('parentSendButton');
const parentMessagesContainer = document.getElementById('parentMessagesContainer');
const childFrame = document.getElementById('childFrame');

// Initialize the parent page
function init() {
    // Set up the button text and input placeholder from config
    parentSendButton.textContent = PARENT_CONFIG.BUTTON_TEXT;
    parentMessageInput.placeholder = PARENT_CONFIG.INPUT_PLACEHOLDER;
    
    // Apply iframe dimensions
    childFrame.style.height = `${PARENT_CONFIG.IFRAME_HEIGHT}px`;
    
    // Add event listeners
    parentSendButton.addEventListener('click', sendMessageToIframe);
    parentMessageInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') sendMessageToIframe();
    });
    
    // Listen for messages from iframe
    window.addEventListener('message', receiveMessageFromIframe);
    
    // Log initialization
    if (PARENT_CONFIG.DEBUG_MODE) {
        console.log('Parent page initialized, waiting for iframe to be ready...');
    }
}

// Send message to iframe
function sendMessageToIframe() {
    const message = parentMessageInput.value.trim();
    if (!message) return;
    
    const messageData = {
        type: 'parentMessage',
        data: message,
        timestamp: new Date().toISOString()
    };
    
    // Check if iframe is loaded
    if (childFrame.contentWindow) {
        // Post message to iframe
        childFrame.contentWindow.postMessage(messageData, PARENT_CONFIG.TARGET_ORIGIN);
        
        if (PARENT_CONFIG.CLEAR_INPUT_AFTER_SEND) {
            parentMessageInput.value = '';
        }
        
        // Add send indicator to UI
        addMessageToUI(`Sent to iframe: ${message}`, 'outgoing');
    } else {
        addMessageToUI('Error: Iframe not yet loaded', 'error');
    }
}

// Handle received messages from iframe
function receiveMessageFromIframe(event) {
    // Security check
    if (PARENT_CONFIG.SECURITY_CHECK && !isAllowedOrigin(event.origin)) {
        if (PARENT_CONFIG.DEBUG_MODE) {
            console.warn(`Blocked message from unauthorized origin: ${event.origin}`);
        }
        return;
    }
    
    const message = event.data;
    
    if (PARENT_CONFIG.LOG_RECEIVED_MESSAGES) {
        console.log('Received from iframe:', message);
    }
    
    // Process different message types
    if (typeof message === 'object') {
        // Handle specific message types
        switch (message.type) {
            case 'iframeReady':
                handleIframeReady();
                break;
            case 'userMessage':
                addMessageToUI(`Received from iframe: ${message.data}`, 'incoming');
                // Auto reply if enabled
                if (PARENT_CONFIG.AUTO_REPLY_ENABLED && message.data) {
                    setTimeout(() => {
                        const autoReply = createAutoReply(message.data);
                        sendAutoReply(autoReply);
                    }, PARENT_CONFIG.AUTO_REPLY_DELAY);
                }
                break;
            default:
                if (message.data !== undefined) {
                    addMessageToUI(`Received from iframe: ${message.data}`, 'incoming');
                }
        }
    } else if (typeof message === 'string') {
        // Simple string message
        addMessageToUI(`Received from iframe: ${message}`, 'incoming');
    }
}

// Check if origin is allowed
function isAllowedOrigin(origin) {
    return PARENT_CONFIG.ALLOWED_ORIGINS.includes('*') || 
           PARENT_CONFIG.ALLOWED_ORIGINS.includes(origin);
}

// Handle iframe ready event
function handleIframeReady() {
    if (PARENT_CONFIG.DEBUG_MODE) {
        console.log('Iframe is ready to receive messages');
    }
    
    if (PARENT_CONFIG.SEND_WELCOME_MESSAGE) {
        setTimeout(() => {
            const welcomeMsg = {
                type: 'parentCommand',
                data: PARENT_CONFIG.WELCOME_MESSAGE,
                timestamp: new Date().toISOString()
            };
            childFrame.contentWindow.postMessage(welcomeMsg, PARENT_CONFIG.TARGET_ORIGIN);
            addMessageToUI(`Sent welcome: ${PARENT_CONFIG.WELCOME_MESSAGE}`, 'system');
        }, PARENT_CONFIG.WELCOME_DELAY);
    }
}

// Create auto-reply message based on received message
function createAutoReply(receivedMessage) {
    // Simple auto-reply for demo purposes
    return `Auto-reply: I received your message "${receivedMessage}"`;
}

// Send auto-reply to iframe
function sendAutoReply(replyMessage) {
    const messageData = {
        type: 'parentMessage',
        data: replyMessage,
        timestamp: new Date().toISOString(),
        isAutoReply: true
    };
    
    childFrame.contentWindow.postMessage(messageData, PARENT_CONFIG.TARGET_ORIGIN);
    addMessageToUI(`Auto-replied: ${replyMessage}`, 'system');
}

// Add message to UI
function addMessageToUI(text, messageType = 'incoming') {
    const messageElement = document.createElement('div');
    messageElement.className = 'parent-message';
    
    // Apply different styles based on message type
    if (messageType === 'outgoing') {
        messageElement.style.backgroundColor = PARENT_CONFIG.OUTGOING_MSG_STYLE.backgroundColor;
        messageElement.style.borderLeftColor = PARENT_CONFIG.OUTGOING_MSG_STYLE.borderColor;
    } else if (messageType === 'system') {
        messageElement.style.backgroundColor = PARENT_CONFIG.SYSTEM_MSG_STYLE.backgroundColor;
        messageElement.style.borderLeftColor = PARENT_CONFIG.SYSTEM_MSG_STYLE.borderColor;
    } else if (messageType === 'error') {
        messageElement.style.backgroundColor = PARENT_CONFIG.ERROR_MSG_STYLE.backgroundColor;
        messageElement.style.borderLeftColor = PARENT_CONFIG.ERROR_MSG_STYLE.borderColor;
    } else {
        messageElement.style.backgroundColor = PARENT_CONFIG.INCOMING_MSG_STYLE.backgroundColor;
        messageElement.style.borderLeftColor = PARENT_CONFIG.INCOMING_MSG_STYLE.borderColor;
    }
    
    const timestamp = new Date().toLocaleTimeString([], PARENT_CONFIG.TIMESTAMP_FORMAT);
    messageElement.textContent = `[${timestamp}] ${text}`;
    
    // Apply animation
    messageElement.style.animation = `fadeIn ${PARENT_CONFIG.ANIMATION_DURATION}ms ease-in`;
    
    // Add message to container
    parentMessagesContainer.prepend(messageElement);
    
    // Limit number of messages
    while (parentMessagesContainer.children.length > PARENT_CONFIG.MAX_MESSAGES) {
        parentMessagesContainer.removeChild(parentMessagesContainer.lastChild);
    }
}

// Initialize the page when DOM is ready
document.addEventListener('DOMContentLoaded', init);