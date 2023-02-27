import { useFormik } from "formik";
import { FC, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext, RoleType } from "../../App";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { ROUTES } from "../../constants/routes";
import { STORAGE } from "../../constants/storage";
import useQuery from "../../hooks/useQuery";
import { signInRequest } from "../../services/auth.service";
import SignInSchema from "../../validations/SignIn.schema";

const LoginPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { setRole, setToken } = useContext(AuthContext);
  const { email } = useQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    values,
    errors,
    touched
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const result = await signInRequest(values);
        if (result.data.success) {
          localStorage.setItem(STORAGE.TOKEN, result.data.data.token);
          const { token, role } = result.data.data;
          setToken(token);
          setRole(role === RoleType.User ? "user" : "admin");
          // @ts-ignore
          const prevRoute = location.state?.from;
          navigate(
            prevRoute
              ? prevRoute
              : role === RoleType.User
              ? ROUTES.HOMEPAGE
              : ROUTES.MANAGE_ORDER
          );
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

  useEffect(() => {
    if (email) {
      setFieldValue("email", email);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <form className="flex flex-col items-center pb-8" onSubmit={handleSubmit}>
      <div className="font-semibold text-5xl text-pink-300 my-16">Sign-In</div>
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
      <Button
        type="submit"
        title="SIGN IN"
        className="mt-16 mb-4"
        loading={loading}
      />
      <Link to="/forgot-password">Forgot Password?</Link>
      <Link to={ROUTES.REGISTER}>Create New Account</Link>
    </form>
  );
};

export default LoginPage;
