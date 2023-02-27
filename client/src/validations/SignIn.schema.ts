import * as Yup from "yup";

export default Yup.object().shape({
  email: Yup.string()
    .email("Please type in a valid e-mail address.")
    .required("Please type in a valid e-mail address."),
  password: Yup.string().required("Please type in your password.")
});
