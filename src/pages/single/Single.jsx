import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";

const Single = () => {
  const [data, setData] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "users", userId);
        console.log(docRef);
        const docSnap = await getDoc(docRef);
        console.log(docSnap);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId]);

  console.log("Device Nam:", data.attached);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{data.displayName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{data.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Product:</span>
                  <span className="itemValue">{data.macAddress}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              cases="day"
              aspect={5 / 1}
              title="User Spending ( Last Day)"
              deviceName={data.macAddress}
            />
          </div>
        </div>
        <div className="bottom">
          <Chart
            cases="months"
            aspect={5 / 1}
            title="User Months"
            deviceName={data.macAddress}
          />
          {/* <Chart
            aspect={5 / 1}
            title="User Years"
            cases="years"
            deviceName={data.macAddress}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Single;
