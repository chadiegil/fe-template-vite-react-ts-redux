import { object, string } from "yup"

export const loginSchema = object().shape({
  email: string().email("Invalid email format").required("Email is required"),
  password: string().required("Password is required"),
})

export const registerSchema = object().shape({
  email: string().email("Invalid email format").required("Email is required"),
  password: string().required("Password is required"),
  first_name: string().required("First name is required"),
  last_name: string().required("Last name is required"),
  role: string().required("Role is required"),
  contact_no: string().required("Contact number is required"),
  address: string().required("Address is required"),
})
