import React, { useState } from "react";
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
    { field: "name", headerName: "Name", width: 210 },
    { field: "gender", headerName: "Gender", width: 210 },
    { field: "address", headerName: "Address", width: 210 },
    { field: "country", headerName: "Country", width: 210 },
    {
      field: "years",
      headerName: "Years",
      // description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 210,
    },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      width: 210,
      renderCell: (params) => (
        <>
          <button onClick={() => deleteUser(params.row.id)}>Delete</button>
          &nbsp;
          <button onClick={() => editUser(params.row.id, params.row)}>
            Edit
          </button>
        </>
      ),
    },
  ];

  const originalList = data?.map((user, id) => ({
    id: id,
    name: user.name,
    gender: user.gender,
    years: user.years,
    country: user.country,
    address: user.address,
  }));

  const [copyList, setCopyList] = useState(originalList);

  const requestSearch = (searched) => {
    setCopyList(originalList.filter((item) => item.name.toLowerCase().includes(searched.toLowerCase())));
  };

  const rows = copyList.length > 0 ? copyList : originalList;

  const tableStyle = {
    color: "white",
  };

  return (
    <div>
      <h2>User Table</h2>

      Search: <input
        type="search"
        name="search"
        id="search"
        onInput={(e) => requestSearch(e.target.value)}
      /> 
      <br />
      <br />
      

      <div style={{ width: "100%" }}>
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
      <br />
      <br />

    </div>
  );
};

export default DisplayData;
