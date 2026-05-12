import React from "react";
import { useParams } from "react-router-dom";

function ShowPoll() {
  const { id } = useParams();
  return <div>showPoll : {id}</div>;
}

export default ShowPoll;
