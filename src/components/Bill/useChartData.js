import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { getDatabase } from "firebase/database";

const useChartData = () => {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      const array = [];
      for (const deviceKey in data) {
        const deviceData = data[deviceKey];
        for (const yearKey in deviceData) {
          const yearData = deviceData[yearKey];
          for (const monthKey in yearData) {
            const monthData = yearData[monthKey];
            for (const dayKey in monthData) {
              const dayData = monthData[dayKey];
              const totalData = monthData["Total"];
              const entry = totalData
                ? {
                    device: deviceKey,
                    year: yearKey,
                    month: monthKey,

                    Total: totalData,
                  }
                : {
                    device: deviceKey,
                    year: yearKey,
                    month: monthKey,
                    day: dayKey,
                    ...dayData,
                  };
              array.push(entry);
            }
          }
        }
      }
      setDataArray(array);
    });
  }, []);

  return dataArray;
};

export default useChartData;
