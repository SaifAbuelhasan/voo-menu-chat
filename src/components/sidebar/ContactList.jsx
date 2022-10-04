import { useState, useEffect } from "react";
import firestore from "../../database/index";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { connect } from "react-redux";
import { setActiveCustomer } from "../../actions/activeCustomer";
import Contact from "./Contact";

const ContactList = (props) => {
  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [chats, setChats] = useState([]);
  // convert shopId to string
  const shopId = props.authedUser.ShopId.toString();

  useEffect(() => {
    if (props.activeBranches.branches.length < 1) {
      setChats([]);
      return;
    }
    // listen to all chats with shopId
    let collectionQuery;
    if (props.activeBranches.allBranches) {
      collectionQuery = query(
        collection(firestore, "chatData"),
        where("shopId", "==", shopId),
        orderBy("lastMessage.date", "desc")
      );
    }
    // listen to chats with shopId and branchId
    else {
      collectionQuery = query(
        collection(firestore, "chatData"),
        where("branchId", "in", props.activeBranches.branches),
        orderBy("lastMessage.date", "desc")
      );
    }
    const unsubscribe = onSnapshot(collectionQuery, (querySnapshot) => {
      const newChats = [];
      querySnapshot.forEach((doc) => {
        newChats.push({ ...doc.data(), id: doc.id });
      });
      setChats(newChats);
    });
    return unsubscribe;
  }, [props.activeBranches]);

  return (
    <ul className="contacts-list" id="chatContactTab" data-chat-list="">
      {chats.map((chat, idx) => {
        return <Contact key={idx} chat={chat} />;
      })}
    </ul>
  );
};

const mapStateToProps = (state, props) => {
  return {
    activeBranches: state.activeBranches,
    authedUser: state.authedUser,
  };
};

export default connect(mapStateToProps)(ContactList);
