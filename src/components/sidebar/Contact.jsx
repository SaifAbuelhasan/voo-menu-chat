import { useState } from "react";
import { connect } from "react-redux";
import { getTime } from "../../database/services";

const Contact = (props) => {
  const {
    chat /* , handleClick, lastMessage, unseenMessages, activeCustomer */,
  } = props;
  let isActive = "";

  if (props.activeCustomer) {
    isActive = chat.id === props.activeCustomer.id ? "active" : "";
  }
  return (
    <li
      className={`contacts-item friends ${isActive}`}
      // onClick={() => handleClick(chat)}
    >
      <a className="contacts-link" href="javascript:;">
        <div className="avatar avatar-online">
          <img
            src={`../../assets/media/avatar/${chat.userInfo.avatar}.png`}
            alt=""
          />
        </div>
        <div className="contacts-content">
          <div className="contacts-info">
            <h6 className="chat-name text-truncate">{chat.userInfo.name}</h6>
            {/* <div className="chat-time">
              {lastMessage ? getTime(lastMessage) : ""}
            </div> */}
          </div>
          <div className="contacts-texts">
            <p className="text-truncate">
              {chat.lastMessageText ? chat.lastMessageText : "No messages"}
            </p>
            {/* {
              // show number of unseen messages
              unseenMessages > 0 &&
              (!props.activeCustomer ||
                chat.id !== props.activeCustomer.id) ? (
                <div class="badge badge-rounded badge-primary ml-1">
                  {unseenMessages}
                </div>
              ) : null
            } */}
          </div>
        </div>
      </a>
    </li>
  );
};

const mapStateToProps = (state, props) => {
  const { chat } = props;
  // get contact messages from state
  let lastMessage = "";
  const contactMessages = state.messages[chat.id];
  let unseenMessages = 0;
  if (contactMessages) {
    lastMessage = contactMessages[contactMessages.length - 1];
    // get number of unseen messages
    unseenMessages = contactMessages.reduce((acc, message) => {
      if (message.direction === false && message.seen === false) {
        acc += 1;
      }
      return acc;
    }, 0);
    return {
      activeCustomer: state.activeCustomer,
      lastMessage,
      unseenMessages,
    };
  }
};

export default connect(mapStateToProps)(Contact);
