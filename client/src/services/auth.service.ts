import { axiosRequest } from "../utils/axiosRequest";

interface ISignInData {
  email: string;
  password: string;
}

export const signInRequest = (data: ISignInData) => {
  return axiosRequest({
    method: "post",
    url: "auth/login",
    data
  });
};

interface ISignUpData {
  email: string;
  password: string;
}

export const signUpRequest = (data: ISignUpData) => {
  return axiosRequest({
    method: "post",
    url: "auth/register",
    data
  });
};

export const getProfileRequest = () => {
  return axiosRequest({
    method: "get",
    url: "api/users/profile"
  });
};

interface IUpdateProfileData {
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  password?: string;
}

export const updateProfileRequest = (data: IUpdateProfileData) => {
  const formData = new FormData();
  for (let key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }
  return axiosRequest({
    headers: { "Content-Type": "multipart/form-data" },
    method: "put",
    url: "api/users/profile",
    data: formData
  });
};
