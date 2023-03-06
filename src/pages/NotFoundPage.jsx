import { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Fragment>
      <div className="text-center mt-5">
        <h2>Page cannot be found :(</h2>
        <Link to={"/"} className="btn btn-warning mt-5 w-25 fw-bold">
          Go back to home page
        </Link>
      </div>
    </Fragment>
  );
};

export default NotFoundPage;
