import "./App.css";
import NavBarComponent from "components/NavBarComponent";
import { Route, Switch } from "react-router-dom";
import HomePage from "pages/HomePage";
import { ToastContainer } from "react-toastify";
import AboutPage from "pages/AboutPage";
import FooterComponent from "components/FooterComponent";
import useAutoLogin from "hooks/useAutoLogin";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import RegisterBizPage from "pages/RegisterBizPage";
import { useSelector } from "react-redux";
import auth from "store/auth";
import { useEffect, useState } from "react";
import AuthGuardRoute from "components/AuthGuardRoute";
import AllCardsComponent from "components/AllCardsComponent";
import AllCardsPage from "pages/AllCardsPage";
import EditBizCardPage from "pages/EditBizCardPage";
import NotFoundPage from "pages/NotFoundPage";
import CreateCardPage from "pages/CreateCardPage";
import MoreInfoCardPage from "pages/MoreInfoCardPage";
import UserCard from "pages/UserCard";

function App() {
  const autoLogin = useAutoLogin();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [tryToLogin, setTryToLogin] = useState(true);

  useEffect(() => {
    (async () => {
      let status = await autoLogin(localStorage.getItem("token"));
      if (status === false) {
        setTryToLogin(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (loggedIn === true && tryToLogin === true) {
      setTryToLogin(false);
    }
  }, [loggedIn]);

  return (
    <div className="container-fluid">
      <NavBarComponent />
      <div className="flex-grow-1">
        <ToastContainer />
        {!tryToLogin && (
          <Switch>
            <Route path="/" exact component={HomePage}></Route>
            <Route path="/login" component={LoginPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/aboutus" component={AboutPage}></Route>
            <AuthGuardRoute
              path="/registerbiz"
              component={RegisterBizPage}
            ></AuthGuardRoute>
            <AuthGuardRoute
              path="/usercard"
              component={UserCard}
            ></AuthGuardRoute>
            <AuthGuardRoute
              path="/allcards"
              component={AllCardsPage}
            ></AuthGuardRoute>
            <AuthGuardRoute
              path="/editcard/:id"
              component={EditBizCardPage}
            ></AuthGuardRoute>
            <AuthGuardRoute
              path="/createcard"
              component={CreateCardPage}
            ></AuthGuardRoute>
            <AuthGuardRoute
              path="/moreinfo/:id"
              component={MoreInfoCardPage}
            ></AuthGuardRoute>
            {/* <AuthGuardRoute
              path="/usercard"
              component={UserCards}
            ></AuthGuardRoute> */}
            <Route path="*" component={NotFoundPage}></Route>
          </Switch>
        )}
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
