import React from "react";
import { deleteAllUsers } from "../store/slice/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const DeleteAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const deleteUsers = () => {
    dispatch(deleteAllUsers());
  };
  

  return (
    <div>
      <h2>Actions</h2>
      <button onClick={() => navigate("/add")}>Add</button>&nbsp;
      <button onClick={() => deleteUsers()}>Delete All</button>
    </div>
  );
};

export default DeleteAll;
