import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllCardsComponent = ({ name, img, desc, id, onDelete }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const handleDeleteBtn = () => {
    onDelete(id);
  };

  return (
    <div className="row mt-5 mb-5 m-auto">
      <div className="col">
        <div className="card">
          <img src={img} className="card-img-top" alt={name} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{desc}</p>
          </div>
          <div className="card-body d-flex justify-content-between">
            {loggedIn ? (
              <button
                type="button"
                className="btn btn-danger "
                onClick={handleDeleteBtn}
              >
                Delete
              </button>
            ) : null}

            <Link to={`/moreinfo/${id}`} className="btn btn-info">
              More Info
            </Link>
            {loggedIn ? (
              <Link to={`/editcard/${id}`} className="btn btn-info">
                Edit
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCardsComponent;
