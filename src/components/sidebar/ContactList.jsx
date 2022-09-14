import { useState, useReducer, useEffect } from "react";
import firestore from "../../database/index";
import { doc, onSnapshot } from "firebase/firestore";
import { connect } from "react-redux";
import { setActiveCustomer } from "../../actions/activeCustomer";
import Contact from "./Contact";

const ContactList = (props) => {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [chats, setChats] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(firestore, "userChats", "10"), (doc) => {
      // create new object with fields whose branch id is in activeBranches
      const newChats = {};
      for (const [key, value] of Object.entries(doc.data())) {
        if (
          props.activeBranches.filter(
            (branch) => branch.value === value.branchId
          ).length > 0
        ) {
          newChats[key] = value;
        }
      }
      setChats(newChats);
      // setChats(doc.data());
    });
    return unsubscribe;
  }, [props.activeBranches]);

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

const mapStateToProps = (state, props) => {
  return {
    activeBranches: state.activeBranches,
  };
};

export default connect(mapStateToProps)(ContactList);
