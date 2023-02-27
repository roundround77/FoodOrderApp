import { useFormik } from "formik";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { ROUTES } from "../../constants/routes";
import { signUpRequest } from "../../services/auth.service";
import SignUpSchema from "../../validations/SignUp.schema";

const RegisterPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        email: "",
        password: "",
        confirmPassword: ""
      },
      validationSchema: SignUpSchema,
      onSubmit: async (values) => {
        try {
          const { email, password } = values;
          setLoading(true);
          const result = await signUpRequest({ email, password });

          if (result.data.success) {
            toast.success("Registration successfully.");
            navigate(`${ROUTES.LOGIN}?email=${email}`);
          } else {
            toast.error(result.data.message);
          }
        } catch (err) {
          console.error(err);
          // @ts-ignore
          toast.error(err?.message || "An error occured.");
        } finally {
          setLoading(false);
        }
      }
    });

  return (
    <form className="flex flex-col items-center pb-8" onSubmit={handleSubmit}>
      <div className="font-semibold text-5xl text-pink-300 my-16">Sign-Up</div>
      <Input
        name="email"
        placeholder="Enter Your Email Address"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.email && errors.email && (
        <span className="text-red-500 text-sm mt-2">{errors.email}</span>
      )}
      <Input
        type="password"
        name="password"
        placeholder="Enter Password"
        className="mt-4"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.password && errors.password && (
        <span className="text-red-500 text-sm mt-2">{errors.password}</span>
      )}
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Re-enter Password"
        className="mt-4"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.confirmPassword && errors.confirmPassword && (
        <span className="text-red-500 text-sm mt-2">
          {errors.confirmPassword}
        </span>
      )}
      <Button
        type="submit"
        title="SIGN UP"
        className="mt-16 mb-4"
        loading={loading}
      />
    </form>
  );
};

export default RegisterPage;
