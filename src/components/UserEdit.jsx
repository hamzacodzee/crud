import React from "react";
import { editUserData, editUsers } from "../store/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUserSchema } from "../schemas/yup";
import { useFormik } from "formik";

const UserEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector(editUserData);
  
  const id = data.id;
  const userDetails = data.user;
  const initialValues = {
    name: userDetails.name || "",
    gender: userDetails.gender || "",
    years: userDetails.years ? userDetails.years : [], 
    address: userDetails.address || "",
    country: userDetails.country || "",
  };

  const onSubmit = (values, action) => {

    dispatch(editUsers({ id, values }));
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
      <h2>Edit User</h2>

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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserEdit;
