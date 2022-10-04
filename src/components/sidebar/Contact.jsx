import { connect } from "react-redux";
import { setActiveChat } from "../../actions/activeChat";
import { getTime } from "../../database/services";

const Contact = (props) => {
  const { chat } = props;
  const { customerData, lastMessage, shopData } = chat;
  const unreadMessages = shopData.unreadMessages;
  let isActive = "";
  let unread = "";

  isActive = chat.id === props.activeChat.id ? "active" : "";

  if (unreadMessages > 0) {
    unread = "unread";
  }

  return (
    <li
      className={`contacts-item friends ${isActive} ${unread}`}
      onClick={() => {
        props.dispatch(setActiveChat(chat));
        document
          .getElementsByClassName("main")[0]
          .classList.add("main-visible");
      }}
    >
      <a className="contacts-link">
        <div className="avatar avatar-online">
          <img src={customerData.avatar} alt="" />
        </div>
        <div className="contacts-content">
          <div className="contacts-info">
            <h6 className="chat-name text-truncate">{customerData.name}</h6>
            <div className="chat-time">
              {lastMessage.date ? getTime(lastMessage.date.seconds) : ""}
            </div>
          </div>
          <div className="contacts-texts">
            <p className="text-truncate">
              {lastMessage ? lastMessage.text : "No messages"}
            </p>
            {unread !== "" ? (
              <div class="badge badge-rounded badge-primary ml-1">
                {unreadMessages}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </a>
    </li>
  );
};

const mapStateToProps = (state, props) => {
  return {
    activeChat: state.activeChat,
  };
};

export default connect(mapStateToProps)(Contact);
