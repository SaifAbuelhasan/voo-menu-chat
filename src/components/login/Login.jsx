import { useState } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";
import axios from "axios";
import { login } from "../../api/api";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await login(username, password);

      props.dispatch(setAuthedUser(user));
    } catch (error) {
      setError("Invalid username or password");
      console.log(`error ${error}`);
    }
  };
  return (
    <div class="main-layout card-bg-1">
      <div class="container d-flex flex-column">
        <div class="row no-gutters text-center align-items-center justify-content-center min-vh-100">
          <div class="col-12 col-md-6 col-lg-5 col-xl-4">
            <img
              src="../../assets/media/logo-login.svg"
              class="login-logo mb-3"
            />
            <h1 class="font-weight-bold">
              Sign in to <span class="primary-color"> vooo </span> chat
            </h1>
            <p class="text-dark mb-3">Please login to vooo menu chat</p>
            <p class="text-danger mb-3">{error}</p>
            <form class="mb-3" onSubmit={handleSubmit}>
              <div class="form-group">
                <label for="email" class="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  class="form-control form-control-md"
                  id="email"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div class="form-group">
                <label for="password" class="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control form-control-md"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="form-group d-flex justify-content-between">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    checked=""
                    id="checkbox-remember"
                  />
                  <label
                    class="custom-control-label text-muted font-size-sm"
                    for="checkbox-remember"
                  >
                    Remember me
                  </label>
                </div>
                <a class="font-size-sm" href="reset-password.html">
                  Reset password
                </a>
              </div>
              <button
                href="chat-1.html"
                class="btn btn-primary btn-lg btn-block text-uppercase font-weight-semibold"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(Login);
