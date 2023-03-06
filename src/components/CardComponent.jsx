const CardComponent = ({ name, img, desc, id, onDelete }) => {
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  return (
    <div className="row mt-5 mb-5 w-25 ">
      <div className="col">
        <div className="card">
          <img src={img} className="card-img-top" alt={name} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{desc}</p>
          </div>
          <div className="card-body">
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={handleDeleteBtnClick}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
