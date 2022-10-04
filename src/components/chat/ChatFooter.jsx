import firestore from "../../database/index.js";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
  addDoc,
  collection,
  increment,
} from "firebase/firestore";
import { useState } from "react";
import { connect } from "react-redux";

const ChatFooter = (props) => {
  const [message, setMessage] = useState("");

  const handleSend = (text) => {
    const message = {
      text: text,
      sentByShop: true,
      date: { seconds: Date.now() / 1000, milliseconds: Date.now() },
    };
    updateDoc(doc(firestore, "chatData", props.activeChat.id), {
      lastMessage: message,
      ["customerData.unreadMessages"]: increment(1),
    });

    addDoc(
      collection(firestore, "chatData", props.activeChat.id, "messages"),
      message
    );
  };

  return (
    <div className="chat-footer">
      <div className="attachment">
        <div className="dropdown">
          <button
            className="btn btn-secondary btn-icon btn-minimal btn-sm"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <svg
              className="hw-20"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <textarea
        className="form-control emojionearea-form-control"
        id="messageInput"
        rows="1"
        placeholder="Type your message here..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            const text = message;
            setMessage("");
            handleSend(text);
          }
        }}
        value={message}
      ></textarea>
      <div
        id="sendButton"
        className="btn btn-primary btn-icon send-icon rounded-circle text-light mb-1"
        role="button"
        onClick={async () => {
          if (message.trim() !== "") {
            const text = message;
            setMessage("");
            await handleSend(text);
          }
        }}
      >
        <svg
          className="hw-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCustomer: state.activeCustomer,
    activeChat: state.activeChat,
    authedUser: state.authedUser,
  };
};

export default connect(mapStateToProps)(ChatFooter);
