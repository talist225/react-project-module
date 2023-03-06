import { useRouteMatch, Route } from "react-router-dom";
const NestedRoute = ({ component: Component, path, ...rest }) => {
  const { path: extpath } = useRouteMatch();
  return (
    <Route path={`${extpath}${path}`} {...rest} component={Component}></Route>
  );
};
export default NestedRoute;
