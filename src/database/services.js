import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import firestore from "./index";

export const getDate = (message) => {
  const date = new Date(message.time.seconds * 1000);
  return date.toLocaleDateString();
};

export const printDate = (date) => {
  const dateObj = new Date(date);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (dateObj.toLocaleDateString() === today.toLocaleDateString()) {
    return "today";
  }
  if (dateObj.toLocaleDateString() === yesterday.toLocaleDateString()) {
    return "yesterday";
  }
  return dateObj.toLocaleDateString();
};

export const getTime = (message) => {
  //   get date from time stamp
  const date = new Date(message.time.seconds * 1000);

  //   print 12 hrs format
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const minutesString = minutes < 10 ? "0" + minutes : minutes;
  const ampm = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12;
  const hours12String = hours12 < 10 ? "0" + hours12 : hours12;
  const time = hours12String + ":" + minutesString + " " + ampm;
  return time;
};

// /**
//  * listen to changes on active customer messages and dispatch action
//  * @param {Object} authedUser - user containing shopId and branchId
//  * @param {string} customerId - id of customer to listen to
//  * @param {function} callback - dispatch function to dispatch action
//  */
// export const messagesListener = (authedUser, customerId, callback) => {
//   return onSnapshot(
//     query(
//       collection(
//         firestore,
//         "chats",
//         "10",
//         "branches",
//         "20",
//         "customers",
//         customerId,
//         "messages"
//       ),
//       orderBy("time")
//     ),
//     (querySnapshot) => {
//       const messages = [];
//       querySnapshot.forEach((doc) => {
//         messages.push(doc.data());
//       });
//       callback(messages);
//     }
//   );
// };

/**
 * get messages from firestore and store them in an object with the key as the customer id
 * @param {Object} authedUser - user containing shopId and branchId
 * @param {function} callback - dispatch function to dispatch action
 */
export const getMessages = async (authedUser, callback) => {
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
    onSnapshot(messagesQuery, (querySnapshot) => {
      // initialize array for this customer's messages
      const customerMessages = [];
      querySnapshot.forEach((doc) => {
        customerMessages.push({ ...doc.data(), id: doc.id });
      });
      callback(doc.id, customerMessages);
    });
  });
};

/**
 * set message in firestore
 * @param {string} message - message to be set
 * @return {void}
 */
export const sendMessage = async (activeCustomer, message) => {
  try {
    const messagesCollection = collection(
      firestore,
      "chats",
      "10",
      "branches",
      "20",
      "customers",
      activeCustomer,
      "messages"
    );
    await addDoc(messagesCollection, {
      customerName: "John Doe",
      employeeName: "Jane Doe",
      direction: true,
      employeeId: null,
      sender: "1",
      reciever: "2",
      message,
      time: new Date(),
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * change message to seen
 * @param {string} messageId - id of message to be changed
 * @param {string} customerId - id of customer to which message belongs
 * @return {void}
 */
export const changeMessageToSeen = async (messageId, customerId) => {
  try {
    const messageDoc = doc(
      firestore,
      "chats",
      "10",
      "branches",
      "20",
      "customers",
      customerId,
      "messages",
      messageId
    );
    await updateDoc(messageDoc, {
      seen: true,
    });
  } catch (error) {
    console.error(error);
  }
};
