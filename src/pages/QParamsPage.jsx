import { useLocation } from "react-router-dom";

const QParamsPage = () => {
  const location = useLocation();
  const qParmas = new URLSearchParams(location.search);
  return <h1>QParams {qParmas.has("a") ? qParmas.get("a") : "a not exist"}</h1>;
};

export default QParamsPage;
