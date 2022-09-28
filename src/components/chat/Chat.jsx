import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Message from "./Message";
import ChatFooter from "./ChatFooter";
import { setActiveChat } from "../../actions/activeChat";
import { getDate, printDate } from "../../database/services";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import firestore from "../../database/index";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);

  const { activeChat } = props;
  const { name, avatar } = activeChat.customerData
    ? activeChat.customerData
    : {};

  const splitMessagesIntoDays = (messages) => {
    return messages.reduce((acc, message) => {
      const day = getDate(message.date.seconds);

      if (!acc[day]) {
        acc[day] = [];
      }

      acc[day].push(message);
      return acc;
    }, {});
  };

  useEffect(() => {
    if (activeChat.id) {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, "chatData", activeChat.id, "messages"),
          orderBy("date", "asc")
        ),
        (querySnapshot) => {
          const newMessages = [];
          querySnapshot.forEach((doc) => {
            newMessages.push(doc.data());
          });
          setMessages(newMessages);
        }
      );

      return unsubscribe;
    }
    return undefined;
  }, [activeChat.id]);

  // set unread messages to 0
  useEffect(() => {
    if (activeChat.id) {
      updateDoc(doc(firestore, "chatData", activeChat.id), {
        ["shopData.unreadMessages"]: 0,
      });
    }
  }, [activeChat, messages]);

  // useRef to scroll to end of chat on new message
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  // scroll to bottom on mount
  useEffect(() => scrollToBottom, [messages]);
  return (
    <div className="chats">
      {activeChat.id ? (
        <div className="chat-body">
          <div className="chat-header">
            <button
              className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none"
              type="button"
              data-close=""
              onClick={() => {
                props.dispatch(
                  setActiveChat({
                    id: null,
                    userInfo: null,
                    lastMessageText: null,
                    date: null,
                  })
                );
                document
                  .getElementsByClassName("main")[0]
                  .classList.remove("main-visible");
              }}
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>

            <div className="media chat-name align-items-center text-truncate">
              <div className="avatar avatar-online d-none d-sm-inline-block mr-3">
                <img
                  id="chat-header-img"
                  src={`../../assets/media/avatar/${avatar}.png`}
                  alt=""
                />
              </div>

              <div className="media-body align-self-center">
                <h6 id="chat-header-name" className="text-truncate mb-0">
                  {name}
                </h6>
                <small className="text-muted">Online</small>
              </div>
            </div>

            <ul className="nav flex-nowrap">
              <li className="nav-item list-inline-item d-none d-sm-block mr-1">
                <a
                  className="nav-link text-muted px-1"
                  data-toggle="collapse"
                  data-target="#searchCollapse"
                  href="#"
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </a>
              </li>

              <li className="nav-item list-inline-item d-none d-sm-block mr-1">
                <a
                  className="nav-link text-muted px-1"
                  href="#"
                  title="Add People"
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </a>
              </li>
              <li className="nav-item list-inline-item d-none d-sm-block mr-0">
                <div className="dropdown">
                  <a
                    className="nav-link text-muted px-1"
                    href="#"
                    role="button"
                    title="Details"
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
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </a>

                  <div className="dropdown-menu dropdown-menu-right custom-rtl">
                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                      data-chat-info-toggle=""
                    >
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span>View Info</span>
                    </a>

                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                    >
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
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          clipRule="evenodd"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                      </svg>

                      <span>Mute Notifications</span>
                    </a>

                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                    >
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
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>

                      <span>Archive</span>
                    </a>
                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>

                      <span>Delete</span>
                    </a>
                    <a
                      className="dropdown-item align-items-center d-flex text-danger"
                      href="#"
                    >
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
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>

                      <span>Block</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="nav-item list-inline-item d-sm-none mr-0">
                <div className="dropdown">
                  <a
                    className="nav-link text-muted px-1"
                    href="#"
                    role="button"
                    title="Details"
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
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </a>

                  <div className="dropdown-menu dropdown-menu-right">
                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                    >
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>

                      <span>Call</span>
                    </a>
                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                      data-toggle="collapse"
                      data-target="#searchCollapse"
                      aria-expanded="false"
                    >
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
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>

                      <span>Search</span>
                    </a>

                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                      data-chat-info-toggle=""
                    >
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
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>

                      <span>View Info</span>
                    </a>

                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                    >
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
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          clipRule="evenodd"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                      </svg>

                      <span>Mute Notifications</span>
                    </a>
                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                    >
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

                      <span>Wallpaper</span>
                    </a>
                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                    >
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
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        />
                      </svg>

                      <span>Archive</span>
                    </a>
                    <a
                      className="dropdown-item align-items-center d-flex"
                      href="#"
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>

                      <span>Delete</span>
                    </a>
                    <a
                      className="dropdown-item align-items-center d-flex text-danger"
                      href="#"
                    >
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
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>

                      <span>Block</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="collapse border-bottom px-3" id="searchCollapse">
            <div className="container-xl py-2 px-0 px-md-3">
              <div className="input-group bg-light">
                <input
                  type="text"
                  className="form-control form-control-md border-right-0 transparent-bg pr-0"
                  placeholder="Search"
                />
                <div className="input-group-append">
                  <span className="input-group-text transparent-bg border-left-0">
                    <svg
                      className="hw-20 text-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-content p-2" id="messageBody">
            <div className="container">
              {Object.entries(splitMessagesIntoDays(messages))?.map(
                ([day, messages]) => {
                  return (
                    <div class="message-day" key={day}>
                      <div
                        class="message-divider sticky-top pb-2"
                        data-label={printDate(
                          getDate(messages[0].date.seconds)
                        )}
                      >
                        &nbsp;
                      </div>
                      {messages.map((message, index) => {
                        return <Message message={message} key={index} />;
                      })}
                    </div>
                  );
                }
              )}
              {/* {messages.map((message, index) => {
                return <Message message={message} key={index} />;
              })} */}
            </div>

            <div
              ref={messagesEndRef}
              className="chat-finished"
              id="chat-finished"
            ></div>
          </div>

          <ChatFooter />
        </div>
      ) : (
        <div></div>
      )}

      <div className="chat-info">
        <div className="d-flex h-100 flex-column">
          <div className="chat-info-header px-2">
            <div className="container-fluid">
              <ul className="nav justify-content-between align-items-center">
                <li className="text-center">
                  <h5 className="text-truncate mb-0">Profile Details</h5>
                </li>

                <li className="nav-item list-inline-item">
                  <a
                    className="nav-link text-muted px-0"
                    href="#"
                    data-chat-info-close=""
                  >
                    <svg
                      className="hw-22"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="hide-scrollbar flex-fill">
            <div className="text-center p-3">
              <div className="avatar avatar-xl mx-5 mb-3">
                <img
                  className="avatar-img"
                  src={`../../assets/media/avatar/${avatar}.png`}
                  alt=""
                />
              </div>

              <h5 className="mb-1">placeholder</h5>
              <p className="text-muted d-flex align-items-center justify-content-center">
                <svg
                  className="hw-18 mr-1"
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

                <span>San Fransisco, CA</span>
              </p>

              <div className="d-flex align-items-center justify-content-center">
                <div className="btn btn-outline-default btn-icon rounded-circle mx-1">
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <div className="btn btn-primary btn-icon rounded-circle text-light mx-1">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div className="btn btn-danger btn-icon rounded-circle text-light mx-1">
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
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="chat-info-group">
              <a
                className="chat-info-group-header"
                data-toggle="collapse"
                href="#profile-info"
                role="button"
                aria-expanded="true"
                aria-controls="profile-info"
              >
                <h6 className="mb-0">User Information</h6>

                <svg
                  className="hw-20 text-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>

              <div
                className="chat-info-group-body collapse show"
                id="profile-info"
              >
                <div className="chat-info-group-content list-item-has-padding">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item border-0">
                      <p className="small text-muted mb-0">Phone</p>
                      <p className="mb-0">+01-222-364522</p>
                    </li>

                    <li className="list-group-item border-0">
                      <p className="small text-muted mb-0">Email</p>
                      <p className="mb-0">catherine.richardson@gmail.com</p>
                    </li>

                    <li className="list-group-item border-0">
                      <p className="small text-muted mb-0">Address</p>
                      <p className="mb-0">
                        1134 Ridder Park Road, San Fransisco, CA 94851
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="chat-info-group">
              <a
                className="chat-info-group-header"
                data-toggle="collapse"
                href="#shared-media"
                role="button"
                aria-expanded="true"
                aria-controls="shared-media"
              >
                <h6 className="mb-0">Last Media</h6>

                <svg
                  className="hw-20 text-muted"
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
              </a>

              <div
                className="chat-info-group-body collapse show"
                id="shared-media"
              >
                <div className="chat-info-group-content">
                  <div className="form-row">
                    <div className="col-4 col-md-2 col-xl-4">
                      <a href="#">
                        <img
                          src="../../assets/media/shared-photos/01.jpg"
                          className="img-fluid rounded border"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-4 col-md-2 col-xl-4">
                      <a href="#">
                        <img
                          src="../../assets/media/shared-photos/02.jpg"
                          className="img-fluid rounded border"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-4 col-md-2 col-xl-4">
                      <a href="#">
                        <img
                          src="../../assets/media/shared-photos/03.jpg"
                          className="img-fluid rounded border"
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="chat-info-group">
              <a
                className="chat-info-group-header"
                data-toggle="collapse"
                href="#shared-files"
                role="button"
                aria-expanded="true"
                aria-controls="shared-files"
              >
                <h6 className="mb-0">Documents</h6>

                <svg
                  className="hw-20 text-muted"
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
              </a>

              <div
                className="chat-info-group-body collapse show"
                id="shared-files"
              >
                <div className="chat-info-group-content list-item-has-padding">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="document">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
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
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>

                        <div className="document-body">
                          <h6 className="text-truncate">
                            <a
                              href="#"
                              className="text-reset"
                              title="effects-of-global-warming.docs"
                            >
                              Effects-of-global-warming.docs
                            </a>
                          </h6>

                          <ul className="list-inline small mb-0">
                            <li className="list-inline-item">
                              <span className="text-muted">79.2 KB</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-muted text-uppercase">
                                docs
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="document-options ml-1">
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
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
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">
                                Download
                              </a>
                              <a className="dropdown-item" href="#">
                                Share
                              </a>
                              <a className="dropdown-item" href="#">
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="document">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
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
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>

                        <div className="document-body">
                          <h6 className="text-truncate">
                            <a
                              href="#"
                              className="text-reset"
                              title="global-warming-data-2020.xlxs"
                            >
                              Global-warming-data-2020.xlxs
                            </a>
                          </h6>

                          <ul className="list-inline small mb-0">
                            <li className="list-inline-item">
                              <span className="text-muted">79.2 KB</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-muted text-uppercase">
                                xlxs
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="document-options ml-1">
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
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
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">
                                View
                              </a>
                              <a className="dropdown-item" href="#">
                                Share
                              </a>
                              <a className="dropdown-item" href="#">
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="document">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
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
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        </div>

                        <div className="document-body">
                          <h6 className="text-truncate">
                            <a
                              href="#"
                              className="text-reset"
                              title="great-presentation-on global-warming-2020.ppt"
                            >
                              Great-presentation-on global-warming-2020.ppt
                            </a>
                          </h6>

                          <ul className="list-inline small mb-0">
                            <li className="list-inline-item">
                              <span className="text-muted">79.2 KB</span>
                            </li>
                            <li className="list-inline-item">
                              <span className="text-muted text-uppercase">
                                ppt
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="document-options ml-1">
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-icon btn-minimal btn-sm text-muted"
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
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">
                                Download
                              </a>
                              <a className="dropdown-item" href="#">
                                Share
                              </a>
                              <a className="dropdown-item" href="#">
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeChat: state.activeChat,
  };
};

export default connect(mapStateToProps)(Chat);
