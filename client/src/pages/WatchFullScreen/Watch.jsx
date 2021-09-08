import { ArrowBackOutlined } from "@material-ui/icons";
import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./Watch.scss";

export default function Watch() {
  // React useLocation() Hook
  const location = useLocation();
  console.log("Location Object is: ", location);
  const movie = location.movie;

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video className="video" autoPlay progress controls src={movie.video} />
    </div>
  );
}
