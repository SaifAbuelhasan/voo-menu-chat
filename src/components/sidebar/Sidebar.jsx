import { useState } from "react";
import ContactList from "./ContactList";
import Header from "./Header";
const Sidebar = (props) => {
  return (
    <aside className="sidebar">
      <div className="tab-content">
        <div className="tab-pane active" id="chats-content">
          <div className="d-flex flex-column h-100">
            <div className="hide-scrollbar h-100" id="chatContactsList">
              <Header />
              <ContactList />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
