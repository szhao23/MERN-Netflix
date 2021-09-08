import React, { useEffect, useState } from "react";
import "./Home.scss";
import Navbar from "../../components/Navbar/Navbar";
import Featured from "../../components/Featured/Featured";
import List from "../../components/List/List";
import axios from "axios";

const Home = ({ type }) => {
  // lists instead of list because of multiple lists
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        // Connect to API using Axios fetch method to fetch Lists Schema
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzc2MmVmYjUyMDQ4MmU3NzAwNGU2OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTEwNDAyMywiZXhwIjoxNjMxNTM2MDIzfQ.08yBnTnzlj3rqRPCRoNpob8M29PljJ50IozREkaiqO4",
            },
          }
        );
        console.log("Random Lists Response: ", res);
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="Home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
