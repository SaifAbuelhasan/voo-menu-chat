import { connect } from "react-redux";
import { setActiveChat } from "../../actions/activeChat";
import { getTime } from "../../database/services";

const Contact = (props) => {
  const { chat } = props;
  let isActive = "";

  isActive = chat.id === props.activeChat.id ? "active" : "";

  return (
    <li
      className={`contacts-item friends ${isActive}`}
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
  return {
    activeChat: state.activeChat,
  };
};

export default connect(mapStateToProps)(Contact);
