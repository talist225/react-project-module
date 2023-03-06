import { useState, Fragment } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const history = useHistory();
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegisterInput = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(userInput));
    if (newUserInput.hasOwnProperty(event.target.id)) {
      newUserInput[event.target.id] = event.target.value;
      setUserInput(newUserInput);
    }
  };

  const handleRegisterationClick = () => {
    axios
      .post("./users/register", userInput)
      .then((res) => {
        console.log("User created successfully");
        toast.success("User registerd successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.log("User information incorrect");
        toast.error("User information incorrect", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    history.push("/");
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-outline-success m-1 p-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Register
      </button>
      <div
        className="modal fade"
        id="exampleModal2"
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
                <h2 className="mt-3 text-center">Register</h2>
                <div className="form-floating mb-3 mt-5 ">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    value={userInput.name}
                    onChange={handleRegisterInput}
                  />
                  <label htmlFor="nameInput">Name</label>
                </div>
                <div className="form-floating mb-3 ">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={userInput.email}
                    onChange={handleRegisterInput}
                  />
                  <label htmlFor="emailInput">Email address</label>
                </div>
                <div className="form-floating  mb-3 ">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={userInput.password}
                    onChange={handleRegisterInput}
                  />
                  <label htmlFor="passwordInput">Password</label>
                </div>
                <div className="form-check mb-3"></div>
                <button
                  className="btn btn-primary w-50 m-auto"
                  onClick={handleRegisterationClick}
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Register
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterPage;
