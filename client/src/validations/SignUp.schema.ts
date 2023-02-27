import * as Yup from "yup";

export default Yup.object().shape({
  email: Yup.string()
    .email("Please type in a valid e-mail address.")
    .required("Please type in a valid e-mail address."),
  password: Yup.string()
    .required("Please type in your password.")
    .min(5, "Password length must be at least 5 characters."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password does not match Password.")
    .required("Please type in your confirm password.")
});
