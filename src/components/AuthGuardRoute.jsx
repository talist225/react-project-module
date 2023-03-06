import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const AuthGuardRoute = ({ component: Page, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Page {...props}></Page> : <Redirect to="/login"></Redirect>
      }
    ></Route>
  );
};

export default AuthGuardRoute;
