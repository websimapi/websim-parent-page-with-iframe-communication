// Configuration for iframe messaging

/* @tweakable Target origin for sending messages (set to * for any origin, or specific URL in production) */
export const TARGET_ORIGIN = "*";

/* @tweakable Whether to log received messages to console */
export const LOG_RECEIVED_MESSAGES = true;

/* @tweakable Style for received message elements */
export const MESSAGE_STYLE = {
    backgroundColor: "#e9f1ff",
    borderColor: "#4285f4",
    textColor: "#333333",
    fontSize: "16px"
};

/* @tweakable Animation for new messages (ms) */
export const ANIMATION_DURATION = 300;

/* @tweakable Maximum messages to display */
export const MAX_MESSAGES = 10;

/* @tweakable Auto clear input after sending */
export const CLEAR_INPUT_AFTER_SEND = true;

/* @tweakable Button text */
export const BUTTON_TEXT = "Send Message";

/* @tweakable Placeholder text for input */
export const INPUT_PLACEHOLDER = "Enter your message";

/* @tweakable Time format for message timestamps */
export const TIMESTAMP_FORMAT = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

