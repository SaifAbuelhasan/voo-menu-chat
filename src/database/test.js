import axios from "axios";
import {
  doc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  increment,
  // FieldValue,
} from "firebase/firestore";
import firestore from "./index.js";

const createChatData = async (shopId, branchId, customerId) => {
  const chatDataRef = doc(firestore, "chatData", `${branchId}${customerId}`);
  const chatData = {
    shopId,
    branchId,
    customerId,
    customerData: {
      name: "John Doe",
      avatar: "3",
    },
    shopData: {
      name: "KFC",
      avatar: "1",
    },
  };
  await setDoc(chatDataRef, chatData);
};

const sendMessageByCustomer = (branchId, customerId, text) => {
  const chatDataRef = doc(firestore, "chatData", `${branchId}${customerId}`);
  const messagesCollectionRef = collection(chatDataRef, "messages");
  const message = {
    text: text,
    sentByShop: false,
    date: { seconds: Date.now() / 1000, milliseconds: Date.now() },
  };
  // add message to messages collection
  addDoc(messagesCollectionRef, message);
  // update lastMessage
  updateDoc(chatDataRef, {
    lastMessage: message,
    ["shopData.unreadMessages"]: increment(1),
  });
};

const shopId = "6588";
const branches = ["3139", "3215"];
const customerId = "235";

const buildChat = async () => {
  await createChatData(shopId, branches[1], customerId);
  sendMessageByCustomer(branches[0], customerId, "Welcome");
  sendMessageByCustomer(branches[1], customerId, "test");
};

sendMessageByCustomer(branches[0], customerId, "hello hello");

// buildChat();

const login = async (username, password) => {
  const response = await axios.post(
    `http://api4-1-7.vooodelivery.com/api/Accounts/CallCenterEmpLogin`,
    {
      username,
      password,
    }
  );
  return response.data;
};

// const data = await login("01019413412", "lol123456789*");
// console.log(data);
