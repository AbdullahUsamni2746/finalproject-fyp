// import { useEffect, useState } from "react";
// import { auth } from "../../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import {
//   query,
//   where,
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   onSnapshot,
//   serverTimestamp,
//   setDoc,
// } from "firebase/firestore";
// import { db } from "../../firebase";
// import { getDatabase, ref, onValue, set } from "firebase/database";
// import { List } from "@mui/material";

// const Bill = () => {
//   const [dataArray, setDataArray] = useState([]);
//   const [filterDataArray, setFilterDataArray] = useState([]);
//   // const [userListArray, setUserListArray] = useState([]);
//   let userListArray = [];
//   let totalData = "";
//   let entry = {};
//   const array = [];
//   let dataCombined = [];

//   useEffect(() => {
//     findChartData();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
//       const userList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       userListArray = userList;
//       console.log("userList : ", userList);
//       fetchDataFromRealTimeDatabase(userList);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const findChartData = async () => {
//     try {
//       const dbRef = ref(getDatabase());
//       onValue(dbRef, (snapshot) => {
//         const data = snapshot.val();
//         for (const deviceKey in data) {
//           const deviceData = data[deviceKey];
//           for (const yearKey in deviceData) {
//             const yearData = deviceData[yearKey];
//             for (const monthKey in yearData) {
//               const monthData = yearData[monthKey];
//               for (const dayKey in monthData) {
//                 const dayData = monthData[dayKey];
//                 totalData = monthData["Total"];

//                 if (totalData) {
//                   entry = {
//                     device: deviceKey,
//                     year: yearKey,
//                     month: monthKey,
//                     day: dayKey,
//                     ...dayData,
//                     Total: totalData,
//                   };
//                 } else {
//                   entry = {
//                     device: deviceKey,
//                     year: yearKey,
//                     month: monthKey,
//                     day: dayKey,
//                     ...dayData,
//                   };
//                 }

//                 array.push(entry);
//               }
//             }
//           }
//         }
//         console.log("Array:", array);
//         // setDataArray(array);
//       });
//     } catch (error) {
//       console.error("Error retrieving chart data:", error);
//     }
//   };

//   const fetchDataFromRealTimeDatabase = async (users) => {
//     await Promise.all(
//       users.map(async (user) => {
//         if (user.attached !== undefined) {
//           console.log("user ProName:", user.attached);
//           const filter = filterData(user.attached, array);
//           calculateBillingAmount(filter);
//           dataCombined = generateBill(filter);
//           handleGenerateBills(dataCombined);
//         }
//       })
//     );
//   };

//   const filterData = (deviceName, array) => {
//     console.log("Filter Start:", array);
//     console.log("Device Name:", deviceName);
//     const filtered = array.filter((item) => item.day !== "Total");
//     console.log("Filtered Data:", filtered);

//     return filtered;
//   };

//   const calculateBillingAmount = (Array) => {
//     console.log("CAL Array : ", Array);
//     const billingRate = 0.1;
//     const eachArray = Array.map((item) => ({
//       ...item,
//       Amount: item.Total * billingRate,
//     }));
//     console.log("Each Array : ");
//     // Calculate the billing amount based on user's water consumption data
//     // You can implement your billing logic here
//     // Return the calculated billing amount
//     // Assuming user.waterConsumption is an array of water consumption data
//     //   const totalWaterConsumption = user.waterConsumption.reduce(
//     //     (total, consumption) => total + consumption.amount,
//     //     0
//     //   );
//     //   // Assuming your billing rate is $0.10 per unit of water consumed
//     //   // Calculate the billing amount by multiplying the total water consumption by the billing rate
//     //   const billingAmount = totalWaterConsumption * billingRate;
//     //   return billingAmount;
//     // console.log("BIll Billmount : ", data);
//   };

//   const generateBill = (Array) => {
//     console.log("generate bill : ", Array);
//     console.log("generate bill2 : ", userListArray);
//     const combinedData = userListArray.map((user) => {
//       const matchedWaterData = Array.find(
//         (data) => data.device === user.attached
//       );

//       if (matchedWaterData) {
//         return {
//           userId: user.id,
//           userName: user.displayName,
//           userImg: user.img,
//           product: user.attached,
//           userAddress: user.address,
//           email: user.email,
//           phone: user.phone,
//           username: user.username,
//           Total: matchedWaterData.Total,
//           period: matchedWaterData.month + " " + matchedWaterData.year,
//           month: matchedWaterData.month,
//           status: "Not paid",
//         };
//       } else {
//         return null; // or handle the case when there's no matching water data
//       }
//     });
//     console.log("combinedData", combinedData);

//     return combinedData;
//   };
//   const handleGenerateBills = async (dataArr) => {
//     try {
//       console.log("dataArr:", dataArr);

//       const existingBillsSnapshot = await getDocs(collection(db, "bills"));
//       const existingBills = existingBillsSnapshot.docs.map((doc) => doc.data());
//       console.log("existingBills:", existingBills);

//       const promises = dataArr.map(async (data) => {
//         if (data) {
//           console.log("Processing data:", data);

//           const matchingBills = existingBills.filter(
//             (bill) => bill.userId === data.userId && bill.month === "07"
//           );
//           console.log("matchingBills:", matchingBills);

//           if (matchingBills.length === 0) {
//             const res = await createUserWithEmailAndPassword(auth);
//             await setDoc(doc(db, "bills", res.user.uid), {
//               ...data,
//               timestamp: serverTimestamp(),
//             });
//             console.log("Bill added for user:", data.userId);
//             return;
//           } else {
//             console.log("Bill already exists for user:", data.userId);
//           }
//         } else {
//           console.log("Skipping null data.");
//         }
//       });

//       await Promise.all(promises);
//     } catch (error) {
//       console.error("Error checking and adding bills:", error);
//     }
//   };

// const sendSMS = async (toPhoneNumber, message) => {
//   try {
//     const response = await client.messages.create({
//       body: message,
//       from: "YOUR_TWILIO_PHONE_NUMBER",
//       to: toPhoneNumber,
//     });
//     console.log("SMS sent successfully with SID:", response.sid);
//   } catch (error) {
//     console.log("Error sending SMS:", error);
//   }
// };

//   const CurrentMonth = () => {
//     const currentDate = new Date();
//     const currentMonth = currentDate.toLocaleString("default", {
//       month: "long",
//     });

//     return currentMonth;
//   };

//   return <></>;
// };

// export default Bill;
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useChartData from "./useChartData";
import BillFilter from "./BillFilter";
import BillCalculator from "./BillCalculator";
import BillGenerator from "./BillGenerator";
import EmailSender from "./EmailSender";
import SMSSender from "./SMSSender";
import sendEmail from "./EmailSender";

const Bill = () => {
  const [counter, setCounter] = useState(0);

  const updateCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };
  const dataArray = useChartData();
  console.log("counter : ", counter);
  console.log("Haraaami Pan niklunga Mec : ", dataArray);
  const [userListArray, setUserListArray] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      fetchDataFromRealTimeDatabase(userList);
    });

    return () => {
      unsubscribe();
    };
  }, [dataArray || counter]);

  const fetchDataFromRealTimeDatabase = async (users) => {
    const promises = users.map(async (user) => {
      if (user.attached !== undefined) {
        console.log("dataArray : ", dataArray);

        const filter = await BillFilter(user.macAddress, dataArray);
        const billingData = await BillCalculator(filter);
        console.log("bil dat : ", billingData);
        const dataCombined = await BillGenerator(user, billingData);
        console.log("bil dat : ", dataCombined);
        const seenUserIds = new Set();

        // Filter out duplicates and create the uniqueDataArr
        const uniqueDataArr = await dataCombined.filter((currentData) => {
          if (seenUserIds.has(currentData.userId)) {
            // Duplicate user ID found, exclude from uniqueDataArr
            return false;
          }

          // Add the user ID to the Set if it's not already seen
          seenUserIds.add(currentData.userId);
          // Include the current data in uniqueDataArr
          return true;
        });

        console.log("uniqueDataArr : ", uniqueDataArr);

        // Remove duplicate data entries with the same user ID
        // const uniqueDataArr = dataCombined.reduce(
        //   (accumulator, currentData) => {
        //     // Check if the user ID of the current data already exists in the accumulator
        //     const existingData = accumulator.find(
        //       (data) => data.userId === currentData.userId
        //     );

        //     // If not found, add the current data to the accumulator
        //     if (!existingData) {
        //       accumulator.push(currentData);
        //     }

        //     return accumulator;
        //   },
        //   []
        // );

        setUserListArray(uniqueDataArr);
        updateCounter();
      }
    });

    await Promise.all(promises);
  };

  useEffect(() => {
    const handleGenerateBills = async (dataArr) => {
      console.log("Data Array : ", dataArr);

      try {
        const existingBillsSnapshot = await getDocs(collection(db, "bills"));
        const existingBills = existingBillsSnapshot.docs.map((doc) =>
          doc.data()
        );
        console.log("existingBills MATCH : ", existingBills);

        const currentMonth = getCurrentMonth();

        for (const data of dataArr) {
          if (data) {
            const matchingBills = existingBills.filter(
              (bill) => bill.userId === data.userId
            );
            console.log("BILL MATCH : ", matchingBills.length);

            if (matchingBills.length === 0) {
              console.log("asbg auth ", auth);
              console.log("data", data);
              const res = await createUserWithEmailAndPassword(auth);
              await setDoc(doc(db, "bills", res.user.uid), {
                ...data,
                timestamp: serverTimestamp(),
              });
              console.log("Bill added for user:", data.userId);
              console.log("CCCCounter :  ", counter);
              updateCounter(); // Increment the counter for new bills added
              await sendEmail(data); // Consider sending the bill after adding to DB
            } else {
              console.log("Bill already exists for user:", data.userId);
            }
          } else {
            console.log("Skipping null data.");
          }
        }
      } catch (error) {
        console.error("Error checking and adding bills:", error);
      }
    };

    handleGenerateBills(userListArray);
  }, [counter]);

  const getCurrentMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });

    return currentMonth;
  };

  const sendBillToUser = async (data) => {
    try {
      await EmailSender(data);
      await SMSSender(data);
    } catch (error) {
      console.error("Error sending bill to user:", error);
    }
  };

  return <></>;
};

export default Bill;
