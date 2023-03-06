import axios from "axios";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const RegisterBizPage = () => {
  const history = useHistory();
  const [userBizInput, setUserBizInput] = useState({
    nameInput: "",
    emailInput: "",
    passwordInput: "",
    bizInput: false,
  });

  const handleRegisterInput = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(userBizInput));
    if (newUserInput.hasOwnProperty(event.target.id)) {
      newUserInput[event.target.id] = event.target.value;
      setUserBizInput(newUserInput);
    }
  };

  const handleCheckBoxInput = (event) => {
    let newUserInput = JSON.parse(JSON.stringify(userBizInput));
    if (newUserInput.hasOwnProperty(event.target.id)) {
      newUserInput[event.target.id] = event.target.checked;
      setUserBizInput(newUserInput);
    }
  };

  const handleRegisterationClick = () => {
    axios
      .post("./users/register", {
        name: userBizInput.nameInput,
        email: userBizInput.emailInput,
        password: userBizInput.passwordInput,
        biz: userBizInput.bizInput,
      })
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
        data-bs-target="#exampleModal1"
      >
        Bussiness
      </button>
      <div
        className="modal fade"
        id="exampleModal1"
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
                <h2 className="mt-3 text-center">Register for Business User</h2>
                <div className="form-floating mb-3 mt-5 ">
                  <input
                    type="text"
                    className="form-control"
                    id="nameInput"
                    placeholder="Name"
                    value={userBizInput.nameInput}
                    onChange={handleRegisterInput}
                  />
                  <label htmlFor="nameInput">Name</label>
                </div>
                <div className="form-floating mb-3 ">
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="name@example.com"
                    value={userBizInput.emailInput}
                    onChange={handleRegisterInput}
                  />
                  <label htmlFor="emailInput">Email address</label>
                </div>
                <div className="form-floating  mb-3 ">
                  <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    placeholder="Password"
                    value={userBizInput.passwordInput}
                    onChange={handleRegisterInput}
                  />
                  <label htmlFor="passwordInput">Password</label>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="bizInput"
                    checked={userBizInput.bizInput}
                    onChange={handleCheckBoxInput}
                  ></input>
                  <label className="form-check-label" htmlFor="bizInput">
                    Business User
                  </label>
                </div>
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

export default RegisterBizPage;
