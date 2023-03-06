import AboutPage from "pages/AboutPage";
import LoginPage from "pages/LoginPage";
import RegisterBizPage from "pages/RegisterBizPage";
import RegisterPage from "pages/RegisterPage";
import NavBarLinkPartial from "partial/NavBarLinkPartial";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "store/auth";

let links = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About Us",
    url: "/aboutus",
  },
];

let bizLinks = [
  {
    label: "All Cards",
    url: "/allcards",
  },
  {
    label: "Create Card",
    url: "/createcard",
  },
  {
    label: "Admin Panel",
    url: "/admin",
  },
  {
    label: "My Cards",
    url: "/usercard",
  },
];

const NavBarComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dataFromToken = useSelector((state) => state.auth.userData);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authActions.logout());
    history.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          My Project
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li> */}
            {links.map((item, idx) => (
              <NavBarLinkPartial
                key={"navlinks" + idx}
                label={item.label}
                link={item.url}
              />
            ))}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="##"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User Panel
              </a>
              <ul className="dropdown-menu">
                {dataFromToken &&
                  dataFromToken.biz &&
                  bizLinks.map((item, idx) => (
                    <NavBarLinkPartial
                      key={"bizlinks" + idx}
                      label={item.label}
                      link={item.url}
                    />
                  ))}
              </ul>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                User panel
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>

          <Fragment>
            <div className="alert alert-info p-1 mt-3 me-3" role="alert">
              {loggedIn ? `Welcome ${userInfo.name} ` : "Please Login"}
            </div>
            {loggedIn ? null : <LoginPage />}
            {loggedIn ? null : <RegisterPage />}
            {loggedIn ? null : <RegisterBizPage />}
            {loggedIn ? (
              <button
                type="button"
                className="btn btn-outline-danger p-1 m-1"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : null}
          </Fragment>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
