import {
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  increment,
  // FieldValue,
} from "firebase/firestore";
import firestore from "./index.js";

// createShops
const createShops = async () => {
  const shopsRef = doc(firestore, "shops", "10");
  await setDoc(shopsRef, {
    name: "KFC",
    avatar: "1",
  });
  const branchesRef = doc(firestore, "shops", "10", "branches", "1");
  const branchesRef1 = doc(firestore, "shops", "10", "branches", "3");
  await setDoc(branchesRef1, {
    name: "El-Maadi",
  });
  return await setDoc(branchesRef, {
    name: "Nasr City",
  });
};

// create a new userChats document
const createUserChats = async () => {
  const shopChatsRef = doc(firestore, "userChats", "8862");
  // const customerChatsRef = doc(firestore, "userChats", "4");

  return await setDoc(shopChatsRef, {
    8862001: {
      branchId: "3645",
      lastMessageText: "testing",
      date: serverTimestamp(),
      userInfo: {
        name: "Sasha",
        avatar: "1",
        id: "001",
      },
    },
    8862002: {
      branchId: "3645",
      lastMessageText: "last message text",
      date: serverTimestamp(),
      userInfo: {
        name: "Wanda",
        avatar: "5",
        id: "002",
      },
    },
  });
};

const createChats = async () => {
  const chatRef = doc(firestore, "Chats", "8862001");
  await setDoc(chatRef, {
    messages: [
      {
        direction: true,
        text: "Hello",
        date: Timestamp.now(),
        employeeName: "Sasha",
      },
      {
        direction: false,
        text: "testing",
        date: Timestamp.now(),
        employeeName: null,
      },
    ],
  });

  const chatRef1 = doc(firestore, "Chats", "8862002");

  // const chatRef2 = doc(firestore, "Chats", "32");

  // await setDoc(chatRef2, {
  //   messages: [
  //     {
  //       direction: true,
  //       text: "Hello",
  //       date: Timestamp.now(),
  //       employeeName: "Sasha",
  //     },
  //     {
  //       direction: false,
  //       text: "last Message",
  //       date: Timestamp.now(),
  //       employeeName: null,
  //     },
  //   ],
  // });

  return await setDoc(chatRef1, {
    messages: [
      {
        direction: true,
        text: "Hello",
        date: Timestamp.now(),
        employeeName: "Sasha",
      },
      {
        direction: false,
        text: "last message text",
        date: Timestamp.now(),
        employeeName: null,
      },
    ],
  });
};

const sendClientMessage = async () => {
  const chatId = "14";
  const messageText = "testing testing testing";
  await updateDoc(doc(firestore, "Chats", chatId), {
    messages: arrayUnion({
      date: Timestamp.now(),
      text: messageText,
      employeeName: null,
      direction: false,
    }),
  });

  await updateDoc(doc(firestore, "userChats", "10"), {
    [chatId + ".lastMessageText"]: messageText,
    [chatId + ".date"]: Timestamp.now(),
    // increment unread messages
    [chatId + ".unreadMessages"]: increment(1),
  });
};

sendClientMessage();
const buildDB = async () => {
  // await createShops();
  await createUserChats();
  await createChats();
};

buildDB();
