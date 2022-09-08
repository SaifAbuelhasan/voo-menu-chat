import firestore from "../../database/index";
import {
  arrayUnion,
  doc,
  Timestamp,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useState } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../database/services";

const ChatFooter = (props) => {
  const [message, setMessage] = useState("");

  const handleSend = async (text) => {
    await updateDoc(doc(firestore, "Chats", props.activeChat.id), {
      messages: arrayUnion({
        date: Timestamp.now(),
        text: text,
        employeeName: "Sasha",
        direction: true,
      }),
    });

    await updateDoc(doc(firestore, "userChats", "10"), {
      [props.activeChat.id + ".lastMessageText"]: text,
      [props.activeChat.id + ".date"]: Timestamp.now(),
    });
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
          <div className="dropdown-menu nav-item list-inline-item d-block d-xl-none mr-1">
            <a className="dropdown-item" href="#">
              <div className="image-upload">
                <label for="file-input">
                  <svg
                    className="hw-20 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Gallery</span>
                </label>
                <input
                  id="file-input"
                  type="file"
                  name="myImage"
                  accept="image/png, image/gif, image/jpeg , img/jpg"
                />
              </div>
            </a>
            <a className="dropdown-item" href="#">
              <div className="image-upload">
                <label for="file-input2">
                  <svg
                    className="hw-20 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                  </svg>

                  <span>Audio</span>
                </label>
                <input id="file-input2" type="file" accept=".mp3,audio/*" />
              </div>
            </a>
            <a className="dropdown-item" href="#">
              <svg
                className="hw-20 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>

              <span>Document</span>
            </a>

            <a className="dropdown-item" href="#">
              <svg
                className="hw-20 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <span>Location</span>
            </a>
          </div>
        </div>
      </div>
      <textarea
        className="form-control emojionearea-form-control"
        id="messageInput"
        rows="1"
        placeholder="Type your message here..."
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={async (e) => {
          if (e.key === "Enter" && e.target.value.trim() !== "") {
            e.preventDefault();
            const text = message;
            setMessage("");
            await handleSend(text);
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
  };
};

export default connect(mapStateToProps)(ChatFooter);
