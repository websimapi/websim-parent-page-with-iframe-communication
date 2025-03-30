/* Configuration for the parent page that embeds iframe */

/* @tweakable Target origin for sending messages to iframe */
export const PARENT_CONFIG = {
    /* @tweakable Allowed origins for receiving messages (use ['*'] for any origin) */
    ALLOWED_ORIGINS: ['*', 'https://websim.ai'],
    
    /* @tweakable Target origin for sending messages to iframe */
    TARGET_ORIGIN: '*',
    
    /* @tweakable Enable security check for message origin */
    SECURITY_CHECK: false,
    
    /* @tweakable Whether to log received messages to console */
    LOG_RECEIVED_MESSAGES: true,
    
    /* @tweakable Debug mode for additional console logging */
    DEBUG_MODE: true,
    
    /* @tweakable Height of the iframe in pixels */
    IFRAME_HEIGHT: 400,
    
    /* @tweakable Maximum messages to display */
    MAX_MESSAGES: 10,
    
    /* @tweakable Auto clear input after sending */
    CLEAR_INPUT_AFTER_SEND: true,
    
    /* @tweakable Button text */
    BUTTON_TEXT: "Send to Iframe",
    
    /* @tweakable Placeholder text for input */
    INPUT_PLACEHOLDER: "Type message for iframe",
    
    /* @tweakable Animation duration for new messages (ms) */
    ANIMATION_DURATION: 300,
    
    /* @tweakable Time format for message timestamps */
    TIMESTAMP_FORMAT: { hour: '2-digit', minute: '2-digit', second: '2-digit' },
    
    /* @tweakable Send welcome message when iframe is ready */
    SEND_WELCOME_MESSAGE: true,
    
    /* @tweakable Welcome message content */
    WELCOME_MESSAGE: "Hello from parent page! Connection established.",
    
    /* @tweakable Delay before sending welcome message (ms) */
    WELCOME_DELAY: 500,
    
    /* @tweakable Enable auto-replies to iframe messages */
    AUTO_REPLY_ENABLED: false,
    
    /* @tweakable Delay before sending auto-reply (ms) */
    AUTO_REPLY_DELAY: 1000,
    
    /* @tweakable Style for incoming messages */
    INCOMING_MSG_STYLE: {
        backgroundColor: "#e2f3ff",
        borderColor: "#1a73e8",
        textColor: "#333333"
    },
    
    /* @tweakable Style for outgoing messages */
    OUTGOING_MSG_STYLE: {
        backgroundColor: "#f0f7ff",
        borderColor: "#0066cc",
        textColor: "#333333"
    },
    
    /* @tweakable Style for system messages */
    SYSTEM_MSG_STYLE: {
        backgroundColor: "#f0f0f0",
        borderColor: "#666666",
        textColor: "#333333"
    },
    
    /* @tweakable Style for error messages */
    ERROR_MSG_STYLE: {
        backgroundColor: "#ffebee",
        borderColor: "#f44336",
        textColor: "#d32f2f"
    }
};

export default PARENT_CONFIG;