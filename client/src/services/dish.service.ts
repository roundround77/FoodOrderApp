import { axiosRequest } from "../utils/axiosRequest";

interface IGetDishesParams {
  name?: string;
  restaurant?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: number;
}

export const getDishesRequest = (params?: IGetDishesParams) => {
  return axiosRequest({
    method: "get",
    url: "api/products",
    params
  });
};



interface IAddDishesData {
  restaurant: string;
  name: string;
  image: string;
  price: string;
  description: string;
  status: string;
}

export const addDishesRequest = (data: IAddDishesData) => {
  const formData = new FormData();
  for (let key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }
  return axiosRequest({
    headers: { "Content-Type": "multipart/form-data" },
    method: "post",
    url: "/api/products",
    data: formData
  });;
};

export const deleteDishesRequest = (id:string) => {
  return axiosRequest({
    method: "delete",
    url: `/api/products/${id}`,
  });;
};



interface IUpdateDishesData {
  name?: string;
  image?: string;
}
export const updateDishesRequest = (id:string, data: IUpdateDishesData) => {
  const formData = new FormData();
  for (let key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }
  return axiosRequest({
    headers: { "Content-Type": "multipart/form-data" },
    method: "put",
    url: `/api/products/${id}`,
    data: formData
  });;
};
