import { useState, useReducer, useEffect } from "react";
import firestore from "../../database/index";
import {
  collection,
  doc,
  onSnapshot,
  query,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { connect } from "react-redux";
import {
  setActiveCustomer,
  SET_ACTIVE_CUSTOMER,
} from "../../actions/activeCustomer";
import Contact from "./Contact";

const ContactList = (props) => {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [chats, setChats] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(firestore, "userChats", "10"), (doc) => {
      setChats(doc.data());
    });
    // console.log(chats);
    return unsubscribe;
  }, []);

  /**
   * change the state of the activeCustomer
   * @param {Object} customer - customer to be set as active
   */
  const changeActiveCustomer = (customer) => {
    props.dispatch(setActiveCustomer(customer));
  };
  return (
    <ul className="contacts-list" id="chatContactTab" data-chat-list="">
      {/* {customers.map((customer) => {
        return (
          <Contact
            key={customer.id}
            customer={customer}
            handleClick={changeActiveCustomer}
          />
        );
      })} */}
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(([key, value]) => {
          return (
            <Contact
              key={key}
              chat={{ ...value, id: key }}
              handleClick={changeActiveCustomer}
            />
          );
        })}
    </ul>
  );
};

export default connect()(ContactList);
