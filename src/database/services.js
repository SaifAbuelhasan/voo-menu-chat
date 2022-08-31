import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import firestore from "./index";

/**
 * get messages from firestore and store them in an object with the key as the customer id
 * @param {Object} authedUser - user containing shopId and branchId
 * @param {function} callback - dispatch function to dispatch action
 */
export const getMessages = async (authedUser, callback) => {
  // initialize messages object
  const messages = {};

  const customerCollection = collection(
    firestore,
    "chats",
    "10",
    "branches",
    "20",
    "customers"
  );
  const customerDocs = await getDocs(customerCollection);

  customerDocs.forEach(async (doc) => {
    // initialize array for this customer's messages
    const customerMessages = [];

    const messagesCollection = collection(
      firestore,
      "chats",
      "10",
      "branches",
      "20",
      "customers",
      doc.id,
      "messages"
    );
    const messagesQuery = query(messagesCollection, orderBy("time"));
    const messagesDocs = await getDocs(messagesQuery);

    messagesDocs.forEach((doc) => {
      customerMessages.push({ ...doc.data(), id: doc.id });
    });
    // call callback to dispatch action
    callback(doc.id, customerMessages);
  });
  // customerDocs.forEach(async (customerDoc) => {
  //     const messages = await getDocs(collection(firestore, "chats", "10", "branches", "20", "customers", customerDoc.id, "messages"));

  //   return onSnapshot(
  //     collection(firestore, "chats", "10", "branches", "20", "customers"),
  //     (querySnapshot) => {
  //       const customers = [];
  //       const messages = [];
  //       querySnapshot.forEach((doc) => {
  //         customers.push({ ...doc.data(), id: doc.id });
  //         console.log("test test");
  //         console.log(doc);
  //         // const message = { messages: [...doc.data().messages], id: doc.id };
  //         // messages.push(message);
  //       });
  //       callback(customers);
  //     }
  //   );
};

/**
 * listen to changes on active customer messages and dispatch action
 * @param {Object} authedUser - user containing shopId and branchId
 * @param {string} activeCustomerId - id of the active customer
 * @param {function} callback - dispatch function to dispatch action
 */
export const messagesListener = (authedUser, activeCustomerId, callback) => {
  console.log("messagesListener");
  return onSnapshot(
    query(
      collection(
        firestore,
        "chats",
        "10",
        "branches",
        "20",
        "customers",
        activeCustomerId,
        "messages"
      ),
      orderBy("time")
    ),
    (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      callback(messages);
    }
  );
};
