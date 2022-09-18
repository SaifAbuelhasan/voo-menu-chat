import Home from "./Home";
import Login from "./components/login/Login";
import { connect } from "react-redux";
// import { loadChatMessages } from "./actions/messages";

function App(props) {
  return <>{props.authedUser ? <Home /> : <Login />}</>;
}

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
  };
};
export default connect(mapStateToProps)(App);
