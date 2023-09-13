export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "displayName",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "username",
    headerName: "User",
    width: 150,

    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.username}
    //     </div>
    //   );
    // },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "attached",
    headerName: "Attached",
    width: 100,
  },
  {
    field: "macAddress",
    headerName: "MacAddress",
    width: 100,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 300 },

  {
    field: "name",
    headerName: "Name",
    width: 130,
  },

  {
    field: "Mac Address",
    headerName: "Mac Address",
    width: 150,
  },
  {
    field: "attached",
    headerName: "Attached",
    width: 100,
  },
];

export const BillColumns = [
  { field: "userId", headerName: "ID", width: 250 },

  {
    field: "userName",
    headerName: "Name",
    width: 200,
  },
  {
    field: "product",
    headerName: "Product",
    width: 200,
  },
  {
    field: "amount",
    headerName: "Bill/PKR",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
  },
];
