import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AllCardsComponent from "components/AllCardsComponent";
import FooterComponent from "components/FooterComponent";

let initialCardArr = [];

const AllCardsPage = () => {
  const [findInput, setFindInput] = useState("");
  const [allCardsArr, setAllCardsArr] = useState(initialCardArr);
  const [sort, setSortArr] = useState("0");

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get("http://localhost:8181/api/cards/cards");
        initialCardArr = data;
        setAllCardsArr(initialCardArr);
      } catch (err) {
        toast.error("😭 Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    })();
  }, []);

  /*Sort*/
  useEffect(() => {
    if (sort === "1") {
      let allCardsArrCopy = JSON.parse(JSON.stringify(initialCardArr));
      allCardsArrCopy.sort(function (a, b) {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
      setAllCardsArr(allCardsArrCopy);
    }
    if (sort === "2") {
      let allCardsArrCopy = JSON.parse(JSON.stringify(initialCardArr));
      allCardsArrCopy.sort(function (a, b) {
        let x = a.title.toLowerCase();
        let y = b.title.toLowerCase();
        if (x < y) {
          return 1;
        }
        if (x > y) {
          return -1;
        }
        return 0;
      });
      setAllCardsArr(allCardsArrCopy);
    }
    if (sort === "0") {
      let allCardsArrCopy = JSON.parse(JSON.stringify(initialCardArr));
      setAllCardsArr(allCardsArrCopy);
    }
  }, [sort]);
  /*Sort End*/

  const handleFindInputChange = (ev) => {
    setFindInput(ev.target.value);
  };

  const handleDeleteCard = (id) => {
    initialCardArr = allCardsArr.filter((item) => item._id !== id);
    setAllCardsArr(initialCardArr);
  };

  const handleSortCards = (ev) => {
    setSortArr(ev.target.value);
  };

  return (
    <Fragment>
      <div className="form-floating  mt-5 w-25 m-3">
        <input
          type="email"
          className="form-control w-100"
          id="floatingInput"
          placeholder="Find"
          value={findInput}
          onChange={handleFindInputChange}
        />
        <label htmlFor="floatingInput">Find</label>
        <div className="mt-3 d-flex justify-content-between">
          {/* <CreateCard /> */}
          <select
            onChange={handleSortCards}
            value={sort}
            className="form-select w-75 p-2"
            aria-label="Default select example"
          >
            <option value="0">Sort</option>
            <option value="1">A-Z</option>
            <option value="2">Z-A</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-md-4">
        {allCardsArr.map((item) => (
          <AllCardsComponent
            key={"biz" + item._id}
            name={item.title}
            img={item.image.url}
            desc={item.description}
            id={item._id}
            onDelete={handleDeleteCard}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default AllCardsPage;
