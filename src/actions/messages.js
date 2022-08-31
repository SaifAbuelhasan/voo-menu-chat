export const LOAD_CHAT_MESSAGES = "LOAD_CHAT_MESSAGES";

export function loadChatMessages(customerId, messages) {
  return {
    type: LOAD_CHAT_MESSAGES,
    payload: {
      customerId,
      messages,
    },
  };
}
