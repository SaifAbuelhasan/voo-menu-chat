import Sidebar from "./components/sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import { connect } from "react-redux";
import { getMessages } from "./database/services";
import { useEffect } from "react";
import { loadChatMessages } from "./actions/messages";

const print = (array) => {
  array.forEach((element) => {
    console.log(element);
  });
};

function App(props) {
  /**
   * dispatch the messages to the redux store
   * @param {string} customerId
   * @param {array} messages
   */
  const load = (customerId, messages) => {
    props.dispatch(loadChatMessages(customerId, messages));
  };

  useEffect(() => {
    getMessages(null, load);
    return () => {
      console.log("unmounting");
    };
  }, []);

  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main main-visible">
        <Chat />
      </main>

      <div className="appbar">
        <div className="appbar-wrapper hide-scrollbar">
          <div className="d-flex justify-content-center border-bottom w-100">
            <button
              className="btn btn-secondary btn-icon m-0 btn-minimal btn-sm text-muted d-xl-none"
              type="button"
              data-apps-close=""
            >
              <svg
                className="hw-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
          </div>

          <div className="appbar-head">
            <svg
              className="hw-20"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>

            <h6 className="mb-0 mt-1">Apps</h6>
          </div>

          <ul
            className="nav nav-minimal appbar-nav"
            id="appNavTab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="notes-tab"
                data-toggle="tab"
                href="#notes"
                role="tab"
                aria-controls="notes"
                aria-selected="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </a>
            </li>

            <li className="nav-item" role="presentation">
              <a
                className="nav-link"
                id="quick-settings-tab"
                data-toggle="tab"
                href="#quick-settings"
                role="tab"
                aria-controls="quick-settings"
                aria-selected="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div className="tab-content appnavbar-content">
          <div
            className="tab-pane h-100 active"
            id="app-welcome"
            role="tabpanel"
          >
            <div className="appnavbar-content-wrapper">
              <div className="d-flex flex-column justify-content-center text-center h-100 w-100">
                <div className="container">
                  <div className="avatar avatar-lg mb-2">
                    <img
                      className="avatar-img"
                      src="../../assets/media/avatar/4.png"
                      alt=""
                    />
                  </div>

                  <h5>Hey, Christina!</h5>
                  <p className="text-muted">
                    Please select a app to Start using it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="tab-pane h-100"
            id="notes"
            role="tabpanel"
            aria-labelledby="notes-tab"
          >
            <div className="appnavbar-content-wrapper">
              <div className="appnavbar-scrollable-wrapper">
                <div className="appnavbar-heading sticky-top">
                  <ul className="nav justify-content-between align-items-center">
                    <li className="text-center">
                      <h5 className="text-truncate mb-0">Notes</h5>
                    </li>

                    <li className="nav-item list-inline-item">
                      <div data-appcontent-close="">
                        <svg
                          className="hw-22"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="appnavbar-body">
                  <div className="appnavbar-body-title">
                    <div className="dropdown mr-2">
                      <button
                        className="btn btn-outline-default dropdown-toggle"
                        type="button"
                        data-notes-filter-list=""
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        All Notes
                      </button>
                    </div>

                    <form className="form-inline">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control search border-right-0 transparent-bg pr-0"
                          placeholder="Search notes"
                        />
                        <div className="input-group-append">
                          <div
                            className="input-group-text transparent-bg border-left-0"
                            role="button"
                          >
                            <svg
                              className="text-muted hw-20"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="note-container">
                    <div className="note">
                      <div className="note-body">
                        <div className="note-added-on">
                          Sunday, 20/12/2020 at 12:26 PM
                        </div>
                        <h5 className="note-title">Metting with John Doe</h5>
                        <p className="note-description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quis, dolorum odio vitae sapiente eius
                          obcaecati.
                        </p>
                      </div>
                      <div className="note-footer"></div>
                    </div>

                    <div className="note">
                      <div className="note-body">
                        <div className="note-added-on">
                          Sunday, 20/12/2020 at 12:26 PM
                        </div>
                        <h5 className="note-title">Metting with John Doe</h5>
                        <p className="note-description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quis, dolorum odio vitae sapiente eius
                          obcaecati.
                        </p>
                      </div>
                    </div>

                    <div className="note">
                      <div className="note-body">
                        <div className="note-added-on">
                          Sunday, 20/12/2020 at 12:26 PM
                        </div>
                        <h5 className="note-title">Metting with John Doe</h5>
                        <p className="note-description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quis, dolorum odio vitae sapiente eius
                          obcaecati.
                        </p>
                      </div>
                    </div>

                    <div className="note">
                      <div className="note-body">
                        <div className="note-added-on">
                          Sunday, 20/12/2020 at 12:26 PM
                        </div>
                        <h5 className="note-title">Metting with John Doe</h5>
                        <p className="note-description">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quis, dolorum odio vitae sapiente eius
                          obcaecati.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="appnavbar-footer">
                  <div
                    className="btn btn-primary btn-block"
                    role="button"
                    data-toggle="modal"
                    data-target="#addNoteModal"
                  >
                    Add new note
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="tab-pane h-100"
            id="quick-settings"
            role="tabpanel"
            aria-labelledby="quick-settings-tab"
          >
            <div className="appnavbar-content-wrapper">
              <div className="appnavbar-scrollable-wrapper">
                <div className="appnavbar-heading sticky-top">
                  <ul className="nav justify-content-between align-items-center">
                    <li className="text-center">
                      <h5 className="text-truncate mb-0">Settings</h5>
                    </li>

                    <li className="nav-item list-inline-item">
                      <div data-appcontent-close="">
                        <svg
                          className="hw-22"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="appnavbar-body">
                  <div className="settings-container">
                    <ul className="list-group border list-group-flush">
                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Last seen</p>
                          </div>
                          <div className="custom-control custom-switch ml-2">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="quickSettingSwitch1"
                              checked=""
                            />
                            <label
                              className="custom-control-label"
                              for="quickSettingSwitch1"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Read receipts</p>
                          </div>
                          <div className="custom-control custom-switch ml-2">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="quickSettingSwitch2"
                              checked=""
                            />
                            <label
                              className="custom-control-label"
                              for="quickSettingSwitch2"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Media auto download</p>
                          </div>
                          <div className="custom-control custom-switch ml-2">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="quickSettingSwitch3"
                              checked=""
                            />
                            <label
                              className="custom-control-label"
                              for="quickSettingSwitch3"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Notifications</p>
                          </div>
                          <div className="custom-control custom-switch ml-2">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="quickSettingSwitch4"
                              checked=""
                            />
                            <label
                              className="custom-control-label"
                              for="quickSettingSwitch4"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Auto backup</p>
                          </div>
                          <div className="custom-control custom-switch ml-2">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="quickSettingSwitch5"
                              checked=""
                            />
                            <label
                              className="custom-control-label"
                              for="quickSettingSwitch5"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item py-2">
                        <div className="media align-items-center">
                          <div className="media-body">
                            <p className="mb-0">Screen Lock</p>
                          </div>
                          <div className="custom-control custom-switch ml-2">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="quickSettingSwitch6"
                            />
                            <label
                              className="custom-control-label"
                              for="quickSettingSwitch6"
                            >
                              &nbsp;
                            </label>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="appnavbar-footer">
                  <a href="signin.html">
                    <div className="btn btn-primary btn-block">
                      <svg
                        className="hw-18 d-none d-sm-inline-block"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                      Logout
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="backdrop"></div>

      <div
        className="modal modal-lg-fullscreen fade"
        id="startConversation"
        tabindex="-1"
        role="dialog"
        aria-labelledby="startConversationLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="startConversationLabel">
                New Chat
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body p-0 hide-scrollbar">
              <div className="row">
                <div className="col-12">
                  <form className="form-inline w-100 p-2 border-bottom">
                    <div className="input-group w-100 bg-light">
                      <input
                        type="text"
                        className="form-control form-control-md search border-right-0 transparent-bg pr-0"
                        placeholder="Search"
                      />
                      <div className="input-group-append">
                        <div
                          className="input-group-text transparent-bg border-left-0"
                          role="button"
                        >
                          <svg
                            className="hw-20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="col-12">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="media">
                        <div className="avatar avatar-online mr-2">
                          <img src="../../assets/media/avatar/1.png" alt="" />
                        </div>

                        <div className="media-body">
                          <h6 className="text-truncate">
                            <a href="#" className="text-reset">
                              Catherine Richardson
                            </a>
                          </h6>

                          <p className="text-muted mb-0">Online</p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="media">
                        <div className="avatar avatar-online mr-2">
                          <img src="../../assets/media/avatar/2.png" alt="" />
                        </div>

                        <div className="media-body">
                          <h6 className="text-truncate">
                            <a href="#" className="text-reset">
                              Katherine Schneider
                            </a>
                          </h6>

                          <p className="text-muted mb-0">Online</p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="media">
                        <div className="avatar avatar-offline mr-2">
                          <img src="../../assets/media/avatar/3.png" alt="" />
                        </div>

                        <div className="media-body">
                          <h6 className="text-truncate">
                            <a href="#" className="text-reset">
                              Brittany K. Williams
                            </a>
                          </h6>

                          <p className="text-muted mb-0">Offline</p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="media">
                        <div className="avatar avatar-busy mr-2">
                          <img src="../../assets/media/avatar/4.png" alt="" />
                        </div>
                        <div className="media-body">
                          <h6 className="text-truncate">
                            <a href="#" className="text-reset">
                              Christina Turner
                            </a>
                          </h6>
                          <p className="text-muted mb-0">Busy</p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="media">
                        <div className="avatar avatar-away mr-2">
                          <img src="../../assets/media/avatar/5.png" alt="" />
                        </div>

                        <div className="media-body">
                          <h6 className="text-truncate">
                            <a href="#" className="text-reset">
                              Annie Richardson
                            </a>
                          </h6>
                          <p className="text-muted mb-0">Away</p>
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

      <div
        className="modal modal-lg-fullscreen fade"
        id="inviteOthers"
        tabindex="-1"
        role="dialog"
        aria-labelledby="inviteOthersLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="inviteOthersLabel">
                Invite Others
              </h5>

              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body hide-scrollbar">
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group">
                      <label for="inviteEmailAddress">Email address</label>
                      <input
                        type="email"
                        className="form-control form-control-md"
                        id="inviteEmailAddress"
                        placeholder="Type email address here"
                        value=""
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label for="inviteMessage">Invitation message</label>
                      <textarea
                        className="form-control form-control-md no-resize hide-scrollbar"
                        id="inviteMessage"
                        placeholder="Write your message here"
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-link text-muted"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal modal-lg-fullscreen fade"
        id="notificationModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="notificationModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="notificationModalLabel">
                Notifications
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body p-0 hide-scrollbar">
              <div className="row">
                <div className="col-12">
                  <ul className="list-group list-group-flush py-2">
                    <li className="list-group-item">
                      <div className="media">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                          <svg
                            className="hw-24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                        </div>

                        <div className="media-body">
                          <h6>
                            <a href="#">Catherine richardson</a> send you a
                            friend request
                          </h6>

                          <p className="text-muted mb-0">5 mins ago</p>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-2">
                        <button
                          type="button"
                          className="btn btn-outline-danger mx-1"
                        >
                          Reject
                        </button>
                        <button type="button" className="btn btn-primary mx-1">
                          Accept
                        </button>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="media">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                          <svg
                            className="hw-24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>

                        <div className="media-body">
                          <h6>
                            <a href="#">Katelyn Valdez</a> accepted your friend
                            request
                          </h6>

                          <p className="text-muted mb-0">25 mins ago</p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="media">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                          <svg
                            className="hw-24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>

                        <div className="media-body">
                          <h6>
                            <a href="#">Eva Walker</a> updated profile picture
                          </h6>

                          <p className="text-muted mb-0">5 mins ago</p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="media">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                          <svg
                            className="hw-24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>

                        <div className="media-body">
                          <h6>
                            <a href="#">Bonnie Torres</a> accepted your friend
                            request
                          </h6>

                          <p className="text-muted mb-0">5 mins ago</p>
                        </div>
                      </div>
                    </li>

                    <li className="list-group-item">
                      <div className="media">
                        <div className="btn btn-primary btn-icon rounded-circle text-light mr-2">
                          <svg
                            className="hw-24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>

                        <div className="media-body">
                          <h6>
                            <a href="#">Christopher Garcia</a> updated profile
                            picture
                          </h6>

                          <p className="text-muted mb-0">5 mins ago</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-link text-muted">
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal modal-lg-fullscreen fade"
        id="addNoteModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addNoteModalLabel">
                Add new note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="addNoteName" className="col-form-label">
                    Note title:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addNoteName"
                    value=""
                    placeholder="Add note title here"
                  />
                </div>
                <div className="form-group">
                  <label for="addNoteDetails" className="col-form-label">
                    Note details:
                  </label>
                  <textarea
                    className="form-control hide-scrollbar"
                    id="addNoteDetails"
                    rows="4"
                    placeholder="Add note descriptions"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="col-form-label">Note tag:</label>
                  <select className="custom-select font-size-sm shadow-none">
                    <option selected>Personal</option>
                    <option value="1">Important</option>
                    <option value="2">Work</option>
                    <option value="3">Favourite</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light border"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal modal-lg-fullscreen fade"
        id="taskModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="taskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="taskModalLabel">
                Edit task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="editTaskName" className="col-form-label">
                    Task name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTaskName"
                    value="Dinner with friends"
                    placeholder="Add task name here"
                  />
                </div>
                <div className="form-group">
                  <label for="editTaskDetails" className="col-form-label">
                    Task details:
                  </label>
                  <textarea
                    className="form-control hide-scrollbar"
                    id="editTaskDetails"
                    rows="4"
                    placeholder="Add task descriptions"
                  >
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Omnis temporibus vel, molestiae nobis dolor aut sapiente.
                    Vero possimus molestias consequatur quod, quo rem autem
                    molestiae, accusantium nemo culpa eos doloremque?
                  </textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light border"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-success">
                Finish
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal modal-lg-fullscreen fade"
        id="addTaskModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addTaskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-dialog-zoom">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTaskModalLabel">
                Add new task
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="addTaskName" className="col-form-label">
                    Task name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="addTaskName"
                    value=""
                    placeholder="Add task name here"
                  />
                </div>
                <div className="form-group">
                  <label for="addTaskDetails" className="col-form-label">
                    Task details:
                  </label>
                  <textarea
                    className="form-control hide-scrollbar"
                    id="addTaskDetails"
                    rows="4"
                    placeholder="Add task descriptions"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light border"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Add task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
  };
};
export default connect(mapStateToProps)(App);
