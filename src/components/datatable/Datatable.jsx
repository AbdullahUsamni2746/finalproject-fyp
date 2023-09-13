import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import Bill from "../Bill/Bill";
import Select from "react-select";

import {
  BillColumns,
  productColumns,
  userColumns,
} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import ProductDropdown from "../productDropdown/productDropdown";

const Datatable = (props) => {
  const [data, setData] = useState([]);
  const [row, setrow] = useState("");
  console.log("case: ", props.cases);
  const options = [
    // products.map((product) => product.name)
    { value: "CHCOC", label: "CHOCOCCOCO" },
  ];
  useEffect(() => {
    let collectionRef;
    if (props.cases === "users") {
      collectionRef = collection(db, "users");
    } else if (props.cases === "products") {
      collectionRef = collection(db, "products");
    } else {
      collectionRef = collection(db, "bills");
    }

    const unsub = onSnapshot(
      collectionRef,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        console.log(list);
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [props.cases]);
  const handleDetach = async (id, attachedID) => {
    try {
      if (props.cases === "users") {
        await updateDoc(doc(db, "products", attachedID), {
          attached: "",
        });
        await updateDoc(doc(db, "users", id), {
          attached: "",
          macAddress: "",
        });
      } else if (props.cases === "products") {
        await updateDoc(doc(db, "users", attachedID), {
          attached: "",
          macAddress: "",
        });
        await updateDoc(doc(db, "products", id), {
          attached: "",
        });
      }

      // setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id, attachedID) => {
    try {
      if (props.cases === "users") {
        await deleteDoc(doc(db, "users", id));
        await updateDoc(doc(db, "products", attachedID), {
          attached: "",
        });
      } else if (props.cases === "products") {
        await deleteDoc(doc(db, "products", id));

        await updateDoc(doc(db, "users", attachedID), {
          attached: "",
          macAddress: "",
        });
      }

      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = async (id) => {
    // Handle the view functionality
  };

  let assignColumn = [];

  if (props.cases === "users") {
    assignColumn = [
      {
        field: "assigned",
        headerName: "Assigned",
        width: 150,

        renderCell: (params) => {
          console.log("ABdjbj" + params.row.attached);
          const rowAttached = params.row.attached;

          return (
            <ProductDropdown
              id={params.row.id}
              att={params.row.attached}
              state="yes"

              // disabled={params.row.attached === undefined ? true : false}
            />
          );
        },
      },
    ];
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}>
              <div
                className="viewButton"
                onClick={() => handleView(params.row.id)}
              >
                View
              </div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id, params.row.attached)}
            >
              Delete
            </div>
            <div
              className="detachButton"
              onClick={() => handleDetach(params.row.id, params.row.attached)}
            >
              Detach
            </div>
          </div>
        );
      },
    },
  ];

  let columns = [];
  let title = "";

  switch (props.cases) {
    case "users":
      columns = userColumns;
      title = "Users";
      break;
    case "products":
      columns = productColumns;
      title = "Products";
      break;
    case "bills":
      columns = BillColumns;
      title = "Bills";
      break;
    default:
      columns = [];
      title = "";
  }

  if (props.cases === "users" || props.cases === "products") {
    columns = columns.concat(actionColumn);

    columns = columns.concat(assignColumn);
  }

  console.log("bills data : ", data);
  const handleCellEditCommit = async (params) => {
    try {
      const { id, field, value } = params;

      // Assuming 'data' is the state containing the data for the DataGrid
      // Find the row in 'data' with the corresponding 'id'
      const editedRow = data.find((row) => row.id === id);

      // Update the 'email' value of the editedRow
      if (editedRow) {
        editedRow[field] = value;
        await updateDoc(doc(db, "users", id), { [field]: value });

        console.log(value);
        console.log(id);
        console.log(field);
        // setData([...data]); // Update the state with the new data
      }

      // Now you can save the updated 'email' value to the database or perform any other actions you need.
      // For example, you can call an API endpoint to update the 'email' value in the backend database.
      // In this example, we are only updating the frontend state.
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSearch = (event) => {
  //   const newData = data.filter((row) => {
  //     return row.displayName
  //       .toLowerCase()
  //       .includes(event.target.value.toLowerCase());
  //   });

  //   console.log("New Data : ", newData);
  //   newData != [] ? setData(newData) : setData(data);
  //   newData = [];
  // };
  // const prettifiedJson = JSON.stringify(data, null, 2);

  // console.log(prettifiedJson);
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {/* <input
          type="text"
          className="Search"
          placeholder="Search"
          onChange={handleSearch}
        /> */}
        {props.cases !== "bills" ? (
          <Link
            to={props.cases === "users" ? "/users/new" : "/products/new"}
            className="link"
          >
            {props.cases === "users" ? "Add New User" : "Add New Product"}
          </Link>
        ) : (
          <Bill />
        )}
      </div>

      <DataGrid
        width={60}
        onCellEditCommit={handleCellEditCommit}
        className="datagrid"
        rowHeight={50}
        rows={data}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        fixedHeader
        pagination
      />
    </div>
  );
};

export default Datatable;
