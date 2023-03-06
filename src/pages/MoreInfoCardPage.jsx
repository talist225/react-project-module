import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AllCardsComponent from "components/AllCardsComponent";

const MoreInfoCardPage = () => {
  const [bizCard, setBizCard] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`/cards/card/${id}`);
        setBizCard(data);
      } catch (err) {}
    })();
  }, []);
  return (
    bizCard && (
      <div className="m-auto d-flex w-25">
        <AllCardsComponent
          name={bizCard.title}
          img={bizCard.image.url}
          desc={bizCard.description}
          id={bizCard._id}
        ></AllCardsComponent>
      </div>
    )
  );
};

export default MoreInfoCardPage;
