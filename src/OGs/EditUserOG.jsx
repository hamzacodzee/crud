import React, { useEffect, useState } from "react";
import { editUserData, editUsers } from "../store/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const UserEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = localStorage.getItem("update");
  // const data2 = useSelector(editUserData);
  // console.log(data2)

  const parsedData = JSON.parse(data);
  const id = parsedData[0];
  const userDetails = parsedData[1];

  const [formValues, setFormValues] = useState({
    name: userDetails.name || "",
    gender: userDetails.gender || "",
    years: userDetails.years ? userDetails.years : [], // Initialize as an array
    address: userDetails.address || "",
    country: userDetails.country || "",
  });
  

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues));
  }, [formValues]);

  const onChange = (e, inputField) => {
    let value = e.target.value;
  
    if (e.target.type === "checkbox") {
      const isChecked = e.target.checked;
      value = isChecked
        ? [...formValues.years, e.target.value]
        : formValues.years.filter((year) => year !== e.target.value);
    }
  
    setFormValues({ ...formValues, [inputField]: value });
  };
  



  const editUser = () => {
    dispatch(editUsers({ id, formValues }));
    setFormValues({
      name: "",
      gender: "",
      years: "",
      address: "",
      country: "",
    });
    navigate("/");
  };

  return (
    <div>
      <h2>Edit User</h2>

      <input
        type="text"
        onChange={(e) => onChange(e, "name")}
        value={formValues.name}
        placeholder="Name"
      />
      <br />
      <label>
        Male
        <input
          type="radio"
          name="gender"
          value="male"
          onChange={(e) => onChange(e, "gender")}
          checked={formValues.gender === "male"}
        />
      </label>
      <label>
        Female
        <input
          type="radio"
          name="gender"
          value="female"
          onChange={(e) => onChange(e, "gender")}
          checked={formValues.gender === "female"}
        />
      </label>
      <br />
      <label>
        2021
        <input
          type="checkbox"
          value="2021"
          onChange={(e) => onChange(e, "years")}
          checked={formValues.years.includes("2021")}
        />
      </label>
      <label>
        2030
        <input
          type="checkbox"
          value="2030"
          onChange={(e) => onChange(e, "years")}
          checked={formValues.years.includes("2030")}
        />
      </label>
      <br />
      <textarea
        onChange={(e) => onChange(e, "address")}
        value={formValues.address}
        placeholder="Address"
      ></textarea>
      <br />
      <select
        onChange={(e) => onChange(e, "country")}
        value={formValues.country}
      >
        <option value="" disabled>
          Select Country
        </option>
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
        <option value="UK">UK</option>
      </select>
      <br />
      <button onClick={editUser}>Update</button>
    </div>
  );
};

export default UserEdit;
