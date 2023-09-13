// import "./new.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useEffect, useState } from "react";
// import {
//   collection,
//   doc,
//   serverTimestamp,
//   setDoc,
//   getDocs,
// } from "firebase/firestore";
// import { auth, db, storage } from "../../firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useNavigate } from "react-router-dom";

// const New = ({ inputs, title, cases }) => {
//   const [file, setFile] = useState("");
//   const [data, setData] = useState({});
//   const [productData, setproductData] = useState([]);
//   const [per, setPerc] = useState(null);
//   const navigate = useNavigate();
//   console.log("use", cases);

//   useEffect(() => {
//     const uploadFile = () => {
//       const name = new Date().getTime() + file.name;

//       console.log(name);
//       const storageRef = ref(storage, file.name);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//           setPerc(progress);
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//             default:
//               break;
//           }
//         },
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setData((prev) => ({ ...prev, img: downloadURL }));
//           });
//         }
//       );
//     };
//     file && uploadFile();
//   }, [file]);

//   console.log(data);

//   useEffect(() => {
//     const fetchData = async () => {
//       let list = [];
//       try {
//         const querySnapshot = await getDocs(collection(db, "products"));
//         querySnapshot.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setproductData(list);
//         console.log(list);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleInput = (e) => {
//     const id = e.target.id;
//     const value = e.target.value;

//     setData({ ...data, [id]: value });
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await createUserWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );
//       if (cases === "users") {
//         await setDoc(doc(db, cases, res.user.uid), {
//           ...data,
//           attached: "",
//           macAddress: "",
//           timeStamp: serverTimestamp(),
//         });
//       } else {

//         await setDoc(doc(db, cases, res.user.uid), {
//           ...data,
//           attached: "",
//           timeStamp: serverTimestamp(),
//         });
//       }

//       navigate(-1);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             {" "}
//             <img
//               src={
//                 file
//                   ? URL.createObjectURL(file)
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form onSubmit={handleAdd}>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>

//               {inputs.map((input) => (
//                 <div className="formInput" key={input.id}>
//                   <label>{input.label}</label>
//                   <input
//                     id={input.id}
//                     type={input.type}
//                     placeholder={input.placeholder}
//                     onChange={handleInput}
//                   />
//                 </div>
//               ))}
//               {cases === "users" ? (
//                 <div className="formInput">
//                   <label>Select Product</label>
//                   <select>
//                     <option value="">Select a product</option>
//                     {productData.map((input) => (
//                       <option key={input.name} value={input.id}>
//                         {input.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               ) : (
//                 <span></span>
//               )}

//               <button disabled={per !== null && per < 100} type="submit">
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default New;
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Tooltip from "@mui/material/Tooltip";
import sendEmailtoUser from "./sendEmailUser.js";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const DialogBox = ({ showDialog, setShowDialog }) => {
  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    showDialog && (
      <div className="dialog-overlay">
        <div className="dialog-box">
          <p>Form submitted successfully!</p>
          <button onClick={handleCloseDialog}>OK</button>
        </div>
      </div>
    )
  );
};

const New = ({ inputs, title, cases }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [userData, setuserData] = useState([]);
  const [per, setPerc] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  console.log("use", cases);

  console.log(data);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ ...doc.data() });
        });
        setuserData(list);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newFormErrors = {};

    if (
      !data.email ||
      !data.email.trim().match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)
    ) {
      newFormErrors.email = "invalid Email Format";
      isValid = false;
    }

    if (userData.findIndex((doc) => doc.email === data.email) >= 0) {
      newFormErrors.email = "Email already in Use";
      isValid = false;
    }

    if (!data.password || data.password.length < 6) {
      newFormErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setFormErrors(newFormErrors);
    console.log("Error", [formErrors]);
    return isValid;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (validateForm() || cases === "products") {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        if (cases === "users") {
          await setDoc(doc(db, cases, res.user.uid), {
            ...data,
            attached: "",
            macAddress: "",
            timeStamp: serverTimestamp(),
          });
          sendEmailtoUser(data);
        } else {
          await setDoc(doc(db, cases, res.user.uid), {
            ...data,
            attached: "",
            timeStamp: serverTimestamp(),
          });
        }

        setShowDialog(true);
        setTimeout(() => {
          setShowDialog(false);
          navigate(-1);
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <DialogBox showDialog={showDialog} setShowDialog={setShowDialog} />

          <form onSubmit={handleAdd}>
            {inputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  id={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  onChange={handleInput}
                />
                {formErrors[input.id] && (
                  <span className="error">
                    {input.id === input.id && formErrors[input.id] && (
                      <Tooltip title={formErrors[input.id]}>
                        <ErrorOutlineIcon
                          className="errorIcon"
                          style={{ color: "#f44336" }}
                        />
                      </Tooltip>
                    )}
                  </span>
                )}
              </div>
            ))}

            <div className="btn">
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New;
