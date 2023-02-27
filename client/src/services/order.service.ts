import { axiosRequest } from "../utils/axiosRequest";

interface ICreateOrderData {
  products: Array<{ productId: string; amount: number }>;
}

export const createOrderRequest = (data: ICreateOrderData) => {
  return axiosRequest({
    method: "post",
    url: "api/orders",
    data
  });
};

export const getOrdersRequest = () => {
  return axiosRequest({
    method: "get",
    url: "api/orders/my-order"
  });
};


export const getOrdersListRequest = () => {
  return axiosRequest({
    method: "get",
    url: "api/orders"
  });
};
export const deleteOrderRequest = (id:string) => {
  return axiosRequest({
    method: "delete",
    url: `/api/orders/${id}`,
  });;
}


interface IUpdateOrderData {
  products: Array<{ productId: string; amount: number }>;
}

export const updateOrderRequest = (id: string, data: IUpdateOrderData) => {
  return axiosRequest({
    method: "put",
    url: `/api/orders/${id}`,
    data
  });
};