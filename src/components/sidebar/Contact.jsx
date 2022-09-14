import { connect } from "react-redux";
import { setActiveChat } from "../../actions/activeChat";
import { getTime } from "../../database/services";

const Contact = (props) => {
  const { chat } = props;
  let isActive = "";
  let unread = "";

  isActive = chat.id === props.activeChat.id ? "active" : "";

  if (chat.unreadMessages > 0) {
    unread = "unread";
  }

  return (
    <li
      className={`contacts-item friends ${isActive} ${unread}`}
      onClick={() => props.dispatch(setActiveChat(chat))}
    >
      <a className="contacts-link">
        <div className="avatar avatar-online">
          <img
            src={`../../assets/media/avatar/${chat.userInfo.avatar}.png`}
            alt=""
          />
        </div>
        <div className="contacts-content">
          <div className="contacts-info">
            <h6 className="chat-name text-truncate">{chat.userInfo.name}</h6>
            <div className="chat-time">
              {chat.lastMessageText ? getTime(chat.date.seconds) : ""}
            </div>
          </div>
          <div className="contacts-texts">
            <p className="text-truncate">
              {chat.lastMessageText ? chat.lastMessageText : "No messages"}
            </p>
            {unread !== "" ? (
              <div class="badge badge-rounded badge-primary ml-1">
                {chat.unreadMessages}
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
