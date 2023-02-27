import { useFormik } from "formik";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { pickBy } from "lodash";
import { AuthContext } from "../../App";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { ROUTES } from "../../constants/routes";
import UpdateProfileSchema from "../../validations/UpdateProfile.schema";
import { updateProfileRequest } from "../../services/auth.service";
import { toast } from "react-toastify";
import { FaUserAlt } from "react-icons/fa";

const ProfilePage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>("");

  const avatarRef = useRef<HTMLInputElement>(null);
  const { profile } = useContext(AuthContext);

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
      avatar: null,
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: UpdateProfileSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...restProps } = values;

      try {
        setLoading(true);
        // @ts-ignore
        const result = await updateProfileRequest(pickBy({ ...restProps }));
        if (result.data.success) {
          toast.success("Updated user profile successfully.");
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
    if (!profile) return;
    const { email, firstName, lastName, gender, dateOfBirth, avatar } = profile;
    email !== undefined && setFieldValue("email", email);
    firstName !== undefined && setFieldValue("firstName", firstName);
    lastName !== undefined && setFieldValue("lastName", lastName);
    gender !== undefined && setFieldValue("gender", gender);
    dateOfBirth !== undefined && setFieldValue("dateOfBirth", dateOfBirth);
    avatar !== undefined && setAvatar(avatar);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleChangeAvatar = (file: File | undefined) => {
    if (!file) return;
    setFieldValue("avatar", file);
    const reader = new FileReader();
    reader.onload = () => {
      // @ts-ignore
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Breadcrumb
        title="Edit profile"
        routes={[{ title: "Home", href: ROUTES.HOMEPAGE }]}
        className="mt-8 mx-4 lg:mx-32 2xl:mx-64"
      />
      <div className="flex justify-center my-8">
        <div className="w-32">
          <div className="aspect-w-1 aspect-h-1">
            {avatar ? (
              <img src={avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex justify-center items-center bg-neutral-300 text-6xl">
                <FaUserAlt />
              </div>
            )}
          </div>
          <button
            className="mx-auto block mt-4 bg-neutral-300 px-4 py-2"
            onClick={() => avatarRef?.current?.click()}
          >
            Change avatar
          </button>
        </div>
      </div>
      <form
        className="mt-16 mx-4 lg:mx-32 2xl:mx-64 grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center col-start-1 col-end-2 md:col-start-1 md:col-end-2">
          <input
            hidden
            type="file"
            ref={avatarRef}
            name="avatar"
            accept="image/*"
            onChange={(e) => handleChangeAvatar(e.target?.files?.[0])}
          />
          <Input
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && (
            <span className="text-red-500 text-sm mt-2">{errors.email}</span>
          )}
          <Input
            name="firstName"
            placeholder="First Name"
            className="mt-4"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            className="mt-4"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Select
            name="gender"
            placeholder="Gender"
            options={[
              { title: "Male", value: 0 },
              { title: "Female", value: 1 }
            ]}
            className="mt-4"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            className="mt-4"
            value={values.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="flex flex-col items-center col-start-1 col-end-2 md:col-start-2 md:col-end-3">
          <Input
            type="password"
            name="password"
            placeholder="Password"
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
        </div>
        <div className="col-start-1 col-end-3 flex justify-center my-8">
          <Button type="submit" title="SAVE PROFILE" loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
