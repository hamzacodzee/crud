import React from "react";
import { addUsers } from "../store/slice/UserSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    gender: "",
    years: "",
    address: "",
    country: "",
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

  const addUser = () => {
    dispatch(addUsers(formValues));
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
      <h2>Add User</h2>
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
      <button onClick={addUser}>Add</button>
    </div>
  );
};

export default UserAdd;
