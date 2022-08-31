import { useState, useReducer, useEffect } from "react";
import firestore from "../../database/index";
import { collection, onSnapshot, query } from "firebase/firestore";
import { connect } from "react-redux";
import {
  setActiveCustomer,
  SET_ACTIVE_CUSTOMER,
} from "../../actions/activeCustomer";
import Contact from "./Contact";

const customersCollection = collection(
  firestore,
  `/chats/10/branches/20/customers`
);

/**
 * get messages from firestore
 * @param {string} message - message to be set
 * @return {void}
 */
const getCustomers = (callback) => {
  return onSnapshot(query(customersCollection), (querySnapshot) => {
    const customers = [];
    querySnapshot.forEach((doc) => {
      customers.push({ ...doc.data(), id: doc.id });
    });
    callback(customers);
  });
};

const ContactList = (props) => {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const unsubscribe = getCustomers(setCustomers);
    return unsubscribe;
  }, []);

  /**
   * change the state of the activeCustomer
   * @param {Object} customer - customer to be set as active
   */
  const changeActiveCustomer = (customer) => {
    props.dispatch(setActiveCustomer(customer));
  };
  // props.dispatch({
  //   type: "SET_ACTIVE_CUSTOMER",
  //   customer_id,
  // });

  // onSnapshot(customersCollection, (querySnapshot) => {
  //   const data = [];
  //   querySnapshot.forEach((doc) => {
  //     data.push({ ...doc.data(), id: doc.id });
  //   });
  //   setCustomers(data);
  // });
  return (
    <ul className="contacts-list" id="chatContactTab" data-chat-list="">
      {customers.map((customer) => {
        return (
          <Contact
            key={customer.id}
            customer={customer}
            handleClick={changeActiveCustomer}
          />
        );
      })}
    </ul>
  );
};

export default connect()(ContactList);
