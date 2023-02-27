import { axiosRequest } from "../utils/axiosRequest";


export const getUserRequest = () => {
  return axiosRequest({
    method: "get",
    url: "api/users"
  });;
};

export const deleteUserRequest = (id:string) => {
  return axiosRequest({
    method: "delete",
    url: `/api/users/${id}`,
  });;
};



interface IUpdateUserData {
  email: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  password?: string;
  avatar?: string;

}

export const updateUserRequest = (id:string, data: IUpdateUserData) => {
  const formData = new FormData();
  for (let key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }
  return axiosRequest({
    headers: { "Content-Type": "multipart/form-data" },
    method: "put",
    url: `/api/users/${id}`,
    data: formData
  });
};