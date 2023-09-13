import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  BarChart,
  Bar,
  Legend,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  LineChart,
  Line,
} from "recharts";

import "./chart.scss";

const Chart = ({ aspect, title, deviceName, cases }) => {
  const [dataArray, setDataArray] = useState([]);
  const [monthArray, setMonthArray] = useState([]);
  let totalData = "";
  let entry = {};

  useEffect(() => {
    const findChartData = async () => {
      try {
        const dbRef = ref(getDatabase());
        await onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          const array = [];
          for (const deviceKey in data) {
            const deviceData = data[deviceKey];
            for (const yearKey in deviceData) {
              const yearData = deviceData[yearKey];
              for (const monthKey in yearData) {
                const monthData = yearData[monthKey];
                for (const dayKey in monthData) {
                  if (dayKey === "Total") {
                    totalData = monthData[dayKey];
                    entry = {
                      device: deviceKey,
                      year: yearKey,
                      months: monthKey,

                      Total: totalData,
                    };
                  } else {
                    const dayData = monthData[dayKey];
                    entry = {
                      device: deviceKey,
                      year: yearKey,
                      month: monthKey,
                      day: dayKey,
                      ...dayData,
                    };
                  }
                  array.push(entry);
                }
              }
            }
          }
          console.log("Array:", array);
          filterData(deviceName, array);
        });
      } catch (error) {
        console.error("Error retrieving chart data:", error);
      }
    };

    findChartData();
  }, [deviceName]);

  const filterData = (deviceName, array) => {
    console.log("Filter Start:", array);
    console.log("Device Name:", deviceName);
    const filteredData = array.filter(
      (item) =>
        item.device === deviceName &&
        item.day !== null &&
        item.day !== undefined
    );
    const filteredmonthData = array.filter(
      (item) =>
        item.device === deviceName &&
        (item.day === null || item.day === undefined)
    );

    console.log("Filtered Data:", filteredData);
    console.log("filteredmonthData", filteredmonthData);
    setDataArray(filteredData);
    setMonthArray(filteredmonthData);
  };

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={400}
          height={200}
          data={cases === "months" ? monthArray : dataArray}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={cases === "months" ? "months" : "day"} />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey={cases === "months" ? "Total" : "Liquid Quantity"}
            fill="#83ca9d"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
