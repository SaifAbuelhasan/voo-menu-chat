import { useState } from "react";
import { connect } from "react-redux";
import { getTime } from "../../database/services";

const Contact = (props) => {
  const { customer, handleClick } = props;
  let isActive = "";
  // get contact messages from state
  let lastMessage = "";
  const contactMessages = props.messages[customer.id];
  if (contactMessages) {
    lastMessage = contactMessages[contactMessages.length - 1];
  }

  if (props.activeCustomer) {
    isActive = customer.id === props.activeCustomer.id ? "active" : "";
  }
  return (
    <li
      className={`contacts-item friends ${isActive}`}
      onClick={() => handleClick(customer)}
    >
      <a className="contacts-link" href="javascript:;">
        <div className="avatar avatar-online">
          <img
            src={`../../assets/media/avatar/${customer.avatar}.png`}
            alt=""
          />
        </div>
        <div className="contacts-content">
          <div className="contacts-info">
            <h6 className="chat-name text-truncate">{customer.name}</h6>
            <div className="chat-time">
              {lastMessage ? getTime(lastMessage) : ""}
            </div>
          </div>
          <div className="contacts-texts">
            <p className="text-truncate">
              {lastMessage ? lastMessage.message : "No messages"}
            </p>
          </div>
        </div>
      </a>
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCustomer: state.activeCustomer,
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(Contact);
