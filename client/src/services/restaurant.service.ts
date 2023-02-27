import { axiosRequest } from "../utils/axiosRequest";

export const getRestaurantsRequest = () => {
  return axiosRequest({
    method: "get",
    url: "api/restaurants"
  });
};

export const getRestaurantDetailRequest = (id: string) => {
  return axiosRequest({
    method: "get",
    url: `api/restaurants/${id}`
  });
};

interface ICreateRestaurant {
  name: string;
  description: string;
  image: File;
}

export const createRestaurantsRequest = (data: ICreateRestaurant) => {
  const formData = new FormData();
  for (let key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }
  return axiosRequest({
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    url: "api/restaurants",
    data: formData
  });
};

interface IUpdateRestaurant {
  name: string;
  description: string;
  image?: File;
}

export const updateRestaurantsRequest = (
  id: string,
  data: IUpdateRestaurant
) => {
  const formData = new FormData();
  for (let key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }
  return axiosRequest({
    headers: { "Content-Type": "multipart/form-data" },
    method: "put",
    url: `api/restaurants/${id}`,
    data: formData
  });
};

export const deleteRestaurantRequest = (id: string) => {
  return axiosRequest({
    method: "delete",
    url: `api/restaurants/${id}`
  });
};
