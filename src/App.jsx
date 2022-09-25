import Home from "./Home";
import Login from "./components/login/Login";
import { setAuthedUser } from "./actions/authedUser";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
// import { loadChatMessages } from "./actions/messages";

function App(props) {
  // check authedUser cookie
  // if cookie exists, set authedUser in redux store
  // if cookie does not exist, redirect to login page
  const [cookies, setCookie, removeCookie] = useCookies(["authedUser"]);

  useEffect(() => {
    if (cookies.authedUser) {
      props.dispatch(setAuthedUser(cookies.authedUser));
    }
  }, []);

  return props.authedUser ? <Home /> : <Login />;
}

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
  };
};
export default connect(mapStateToProps)(App);
