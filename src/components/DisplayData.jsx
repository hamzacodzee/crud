import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUsers, usersList, whichToEdit } from "../store/slice/UserSlice";
import DeleteAll from "./DeleteAll";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const DisplayData = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector(usersList);


  const deleteUser = (id) => {
    dispatch(removeUsers(id));
  };

  const editUser = (id, user) => {
    dispatch(whichToEdit({ id, user }));
    navigate("/edit");
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    {
      field: "years",
      headerName: "Years",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <button onClick={() => deleteUser(params.row.id)}>Delete</button>
          &nbsp;
          <button onClick={() => editUser(params.row.id, params.row)}>
            Edit
          </button>
        </>
      )
    }
  ];

  const rows = data?.map((user, id) => ({
    id: id,
    name: user.name,
    gender: user.gender,
    years: user.years,
    country: user.country,
    address: user.address,
  }));

  const tableStyle = {
    color: 'white',
};


  return (
    <div>
      <h2>User Table</h2>
      <div style={{  width: "90%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          style={tableStyle}
        />
      </div>

      <DeleteAll />

      
    </div>
  );
};

export default DisplayData;
