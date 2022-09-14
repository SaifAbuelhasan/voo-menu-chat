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
  const shopChatsRef = doc(firestore, "userChats", "10");
  const customerChatsRef = doc(firestore, "userChats", "4");

  await setDoc(shopChatsRef, {
    14: {
      branchId: "1",
      lastMessageText: "testing",
      date: serverTimestamp(),
      userInfo: {
        name: "Sasha",
        avatar: "1",
        id: "10",
      },
    },
  });

  return await setDoc(shopChatsRef, {
    12: {
      branchId: "1",
      lastMessageText: "last Message",
      date: serverTimestamp(),
      userInfo: {
        name: "John Doe",
        avatar: "4",
        id: "2",
      },
    },
    14: {
      branchId: "1",
      lastMessageText: "last Message",
      date: serverTimestamp(),
      userInfo: {
        name: "Jane Doe",
        avatar: "5",
        id: "4",
      },
    },
    32: {
      branchId: "3",
      lastMessageText: "last message in branch 3",
      date: serverTimestamp(),
      userInfo: {
        name: "John Doe",
        avatar: "4",
        id: "2",
      },
    },
  });
};

const createChats = async () => {
  const chatRef = doc(firestore, "Chats", "14");
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
        text: "last Message",
        date: Timestamp.now(),
        employeeName: null,
      },
    ],
  });

  const chatRef1 = doc(firestore, "Chats", "12");

  const chatRef2 = doc(firestore, "Chats", "32");

  await setDoc(chatRef2, {
    messages: [
      {
        direction: true,
        text: "Hello",
        date: Timestamp.now(),
        employeeName: "Sasha",
      },
      {
        direction: false,
        text: "last Message",
        date: Timestamp.now(),
        employeeName: null,
      },
    ],
  });

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
// const buildDB = async () => {
//   // await createShops();
//   await createUserChats();
//   await createChats();
// };

// buildDB();
