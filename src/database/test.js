import { doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import firestore from "./index.js";

// createShops
const createShops = async () => {
  const shopsRef = doc(firestore, "shops", "10");
  await setDoc(shopsRef, {
    name: "KFC",
    avatar: "1",
  });
  const branchesRef = doc(firestore, "shops", "10", "branches", "1");
  return await setDoc(branchesRef, {
    name: "Nasr City",
  });
};

// create a new userChats document
const createUserChats = async () => {
  const userChatsRef = doc(firestore, "userChats", "10");
  return await setDoc(userChatsRef, {
    12: {
      lastMessageText: "last Message",
      date: serverTimestamp(),
      userInfo: {
        name: "John Doe",
        avatar: "4",
        id: "2",
      },
    },
    14: {
      lastMessageText: "last Message",
      date: serverTimestamp(),
      userInfo: {
        name: "Jane Doe",
        avatar: "5",
        id: "4",
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

const buildDB = async () => {
  //   await createShops();
  // await createUserChats();
  await createChats();
};

buildDB();
