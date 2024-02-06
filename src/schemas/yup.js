import { object, string,array } from "yup";

export const addUserSchema = object({
  name: string().min(2).max(25).required("Please Enter Your Name"),
  gender: string().required("Please Select Your Gender"),
  years: array().min(1, "Please Select at least one Year").required("Please Select Your Year"),
  address: string().min(10).required("Please Enter Your Address"),
  country: string().required("Please Select Your Country"),
});