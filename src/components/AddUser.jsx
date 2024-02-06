import React from "react";
import { addUsers } from "../store/slice/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addUserSchema } from "./../schemas/yup";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    name: "abc",
    gender: "male",
    years: ["2021"],
    address: "abc123asd123456",
    country: "UK",
  };

  const onSubmit = (values, action) => {
    dispatch(addUsers(values));
    navigate("/");
    action.resetForm();
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues,
      onSubmit,
      validationSchema: addUserSchema,
    });

  return (
    <div>
      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <br />
          {errors.name && touched.name ? <small>{errors.name}</small> : null}
        </label>
        <br /> <br />
        <label>
          Male
          <input
            type="radio"
            name="gender"
            value="male"
            onBlur={handleBlur}
            onChange={handleChange}
            checked={values.gender === "male"}
          />
        </label>
        <label>
          Female
          <input
            type="radio"
            name="gender"
            value="female"
            onBlur={handleBlur}
            onChange={handleChange}
            checked={values.gender === "female"}
          />
          <br />
          {errors.gender && touched.gender ? (
            <small>{errors.gender}</small>
          ) : null}
        </label>
        <br /> <br />
        <label>
          2021
          <input
            type="checkbox"
            value="2021"
            name="years"
            onBlur={handleBlur}
            onChange={handleChange}
            checked={values.years.includes("2021")}
          />
        </label>
        <label>
          2030
          <input
            type="checkbox"
            value="2030"
            name="years"
            onBlur={handleBlur}
            onChange={handleChange}
            checked={values.years.includes("2030")}
          />
          <br />
          {errors.years && touched.years ? <small>{errors.years}</small> : null}
        </label>
        <br /> <br />
        <textarea
          value={values.address}
          name="address"
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Address"
        ></textarea>
        <br />
        {errors.address && touched.address ? (
          <small>{errors.address}</small>
        ) : null}
        <br />
        <br />
        <select
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.country}
          name="country"
        >
          <option value="" disabled>
            Select Country
          </option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
        </select>
        <br />
        {errors.country && touched.country ? (
          <small>{errors.country}</small>
        ) : null}
        <br />
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddUser;
