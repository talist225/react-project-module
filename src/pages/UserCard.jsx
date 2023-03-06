import axios from "axios";
import CardComponent from "components/CardComponent";
import React, { useState, useEffect, Fragment } from "react";

let initialCardArr = [];

const UserCard = () => {
  const [findInput, setFindInput] = useState("");
  const [bizCardArr, setBizCardArr] = useState(initialCardArr);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("/cards/my-cards");
        initialCardArr = data;
        setBizCardArr(initialCardArr);
      } catch (err) {}
    })();
  }, []);

  useEffect(() => {
    let regex = new RegExp(findInput, "i");
    let bizCardArrCopy = JSON.parse(JSON.stringify(initialCardArr));
    bizCardArrCopy = bizCardArrCopy.filter((item) => regex.test(item.title));
    setBizCardArr(bizCardArrCopy);
  }, [findInput]);

  const handleFindInputChange = (ev) => {
    setFindInput(ev.target.value);
  };

  const handleBizCardDelete = (id) => {
    initialCardArr = initialCardArr.filter((item) => item._id !== id);
    setBizCardArr(initialCardArr);
  };
  return (
    <Fragment>
      <div className="form-floating  mt-5 w-25">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="Find"
          value={findInput}
          onChange={handleFindInputChange}
        />
        <label htmlFor="floatingInput">Find</label>
        <div className="mt-3"></div>
      </div>
      <div className="row row-cols-md-4">
        {bizCardArr.map((item) => (
          <CardComponent
            key={"biz" + item._id}
            name={item.title}
            img={item.image.url}
            desc={item.description}
            id={item._id}
            onDelete={handleBizCardDelete}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default UserCard;
