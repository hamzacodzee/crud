import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUsers, usersList, whichToEdit } from "../store/slice/UserSlice";
import DeleteAll from "../components/DeleteAll";
import { useNavigate } from "react-router-dom";

const DisplayData = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const data = useSelector(usersList);

  const deleteUser = (id) => {
    dispatch(removeUsers(id));
  };

  const editUser = (id, user) => {
    dispatch(whichToEdit({ id, user }));
    navigate("/edit")
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
    </div>
  );
};

export default DisplayData;
