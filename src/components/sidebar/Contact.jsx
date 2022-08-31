import { useState } from "react";
import { connect } from "react-redux";

const Contact = (props) => {
  const { customer, handleClick } = props;
  let isActive = "";
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
            <div className="chat-time">Just now</div>
          </div>
          <div className="contacts-texts">
            <p className="text-truncate">
              I’m sorry, I didn’t catch that. Could you please repeat?
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
  };
};

export default connect(mapStateToProps)(Contact);
