import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUsers, usersList, whichToEdit } from "../store/slice/UserSlice";
import DeleteAll from "../components/DeleteAll";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


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

  return (
    <div>
      <h2>User Table</h2>
      <table border="1" align="center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Years</th>
            <th>Address</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user, id) => (
            <tr key={id}>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.years.join(", ")}</td>
              <td>{user.address}</td>
              <td>{user.country}</td>
              <td>
                <button onClick={() => deleteUser(id)}>Delete</button>
                <button onClick={() => editUser(id, user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteAll />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Years</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Action</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((user, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell align="center">{user.gender}</TableCell>
                <TableCell align="center">{user.years.join(", ")}</TableCell>
                <TableCell align="center">{user.address}</TableCell>
                <TableCell align="center">{user.country}</TableCell>
                <TableCell align="center">
                <button onClick={() => deleteUser(id)}>Delete</button>&nbsp;
                <button onClick={() => editUser(id, user)}>Edit</button>
              </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DisplayData;
