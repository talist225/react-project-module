import axios from "axios";

import { Fragment, useState } from "react";
import { toast } from "react-toastify";

const CreateCardPage = () => {
  const [createCard, setCreateCard] = useState({
    title: "",
    subTitle: "",
    description: "",
    address: "",
    phone: "",
  });

  const handleCreateCardInput = (ev) => {
    let newCreateCard = JSON.parse(JSON.stringify(createCard));
    newCreateCard[ev.target.id] = ev.target.value;
    setCreateCard(newCreateCard);
  };

  const handleCreateCardClick = (ev) => {
    ev.preventDefault();
    axios
      .post("http://localhost:8181/api/cards", {
        title: createCard.title,
        subTitle: createCard.subTitle,
        description: createCard.description,
        address: createCard.description,
        phone: createCard.phone,
      })
      .then((res) => {
        toast.success(
          "Added card successfully",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
          { header: { "x-auth-token": localStorage.getItem("token") } }
        );
      })
      .catch((err) => {
        toast.error("All fields required", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <Fragment>
      <div className="card card-body">
        <div className="form-floating mb-3 w-25 m-auto">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="title"
            value={createCard.title}
            onChange={handleCreateCardInput}
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="form-floating mb-3 w-25 m-auto">
          <input
            type="text"
            className="form-control"
            id="subTitle"
            placeholder="title"
            value={createCard.subTitle}
            onChange={handleCreateCardInput}
          />
          <label htmlFor="subTitle">Subtitle</label>
        </div>
        <div className="form-floating mb-3 w-25 m-auto">
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="title"
            value={createCard.description}
            onChange={handleCreateCardInput}
          />
          <label htmlFor="description">Description</label>
        </div>
        <div className="form-floating mb-3 w-25 m-auto">
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="title"
            value={createCard.address}
            onChange={handleCreateCardInput}
          />
          <label htmlFor="address">Address</label>
        </div>
        <div className="form-floating mb-3 w-25 m-auto">
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="title"
            value={createCard.phone}
            onChange={handleCreateCardInput}
          />
          <label htmlFor="phone">Phone</label>
        </div>
        <button
          type="button"
          className="btn btn-outline-success w-25 m-auto"
          onClick={handleCreateCardClick}
        >
          Add
        </button>
      </div>
    </Fragment>
  );
};

export default CreateCardPage;
