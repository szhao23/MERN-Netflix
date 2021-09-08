import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Decr",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  // Fetch Data for User Statistics from api/routes/users.js
  // /api/users/stats to getUserStats
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzc2MmVmYjUyMDQ4MmU3NzAwNGU2OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTEwNDAyMywiZXhwIjoxNjMxNTM2MDIzfQ.08yBnTnzlj3rqRPCRoNpob8M29PljJ50IozREkaiqO4",
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        // Because Months Array is indexes, June is the 6th month but in the Array it is index 5 so item._id - 1, item_.id = Month
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  console.log("userStats: ", userStats);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
