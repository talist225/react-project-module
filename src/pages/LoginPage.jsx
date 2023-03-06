import { useState, useRef, useEffect, Fragment } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import validate from "../validation/validation";
import loginSchema from "../validation/login.validation";
import useAutoLogin from "../hooks/useAutoLogin";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const emailRef = useRef();
  const history = useHistory();
  const autoLoginFunction = useAutoLogin();
  useEffect(() => {
    emailRef.current.focus();
  }, []);
  const handleUserInputChange = (ev) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    newUserInput[ev.target.id] = ev.target.value;

    setUserInput(newUserInput);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const error = validate(userInput, loginSchema);
    if (error.error) {
      let errorMsgs = "";
      for (let errorItem of error.error.details) {
        switch (errorItem.type) {
          case "string.min":
            errorMsgs += `${errorItem.message}`;
            break;
          case "string.max":
            errorMsgs += `${errorItem.message}`;
            break;
          default:
            errorMsgs += "Something went wrong";
            break;
        }
      }
      toast.error(errorMsgs, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    axios
      .post("/users/login", userInput)
      .then(async (res) => {
        localStorage.setItem("token", res.data.token);
        autoLoginFunction(res.data.token);
        toast.success("Logged in successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/");
      })
      .catch((err) => {
        console.log("Login failed");
        toast.error("Check email or password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const handleEmailInputInvalid = (ev) => {};
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-outline-success m-1 p-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Login
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card card-body">
                <h2 className="text-center mt-3">Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3 mt-5">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
                      value={userInput.email}
                      onChange={handleUserInputChange}
                      onInvalid={handleEmailInputInvalid}
                      ref={emailRef}
                    />
                    <label htmlFor="email">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={userInput.password}
                      onChange={handleUserInputChange}
                    />
                    <label htmlFor="password">Password</label>
                  </div>
                  <button className="btn btn-primary w-50 m-auto">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
