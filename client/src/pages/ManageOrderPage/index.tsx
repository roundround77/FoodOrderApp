import { FC, useEffect } from "react";
import { Table, Tag, Modal, Popconfirm, Image } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import moment from "moment";
import UpdateOrderStatus from "./updateOrder";
import { STORAGE } from "../../constants/storage";
import { BsFillTrashFill } from "react-icons/bs";
import {
  deleteOrderRequest,
  getOrdersListRequest
} from "../../services/order.service";
export interface DataTypeOrder {
  _id: string;
  total: string;
  createdAt: string;
  orderStatus: number;
  email: string;
  foodName?: string;
  fullname?: string;
  amount: number;
}

const ManageOrderPage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };
  const getList = () => {
    const storageToken = localStorage.getItem(STORAGE.TOKEN);
    if (storageToken) {
      try {
        (async () => {
          const result = await getOrdersListRequest();
          if (result.data.success) {
            console.log(result.data);
            result.data.data.data.sort((a: any, b: any) =>
              b.createdAt.localeCompare(a.createdAt)
            );
            setDataSource(result.data.data.data);
          }
        })();
      } catch (err) {
        console.error(err);
      }
    } else {
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<DataTypeOrder> = [
    {
      title: "Tracking Number",
      dataIndex: "_id",
      key: "_id"
    },
    {
      title: "Information",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <h3
          className="p-1  text-white w-10 cursor-pointer h-8 bg-green-600 flex items-center justify-center hover:bg-green-500 rounded-sm "
          onClick={() => {
            setIsModalVisible(true);
            setEditingProductId(_id);
            setdataModal(
              dataSource === undefined
                ? ""
                : dataSource.find(
                    (product: any) => product._id === editingProductId
                  )?.products
            );
            console.log(dataModal);
          }}
        >
          view
        </h3>
      )
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        createdAt ? moment(createdAt).format("DD-MM-YYYY") : ""
    },
    {
      title: "Name Customers",
      dataIndex: "userId",
      key: "fullname",
      render: (userId) => {
        if (userId) {
          return userId.name
            ? `${userId?.fullname}`
            : `${userId?.firstName} ${userId?.lastName}  `;
        }
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Amount",
      dataIndex: "products",
      key: "productId",
      render: (products) => {
        if (products) {
          return products[0]?.amount;
        }
      },
      className: "hidden"
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: ({ orderStatus }) => {
        let color = "";
        let tag = "";
        if (orderStatus === 0) {
          color = "green";
          tag = "CONFIRMED";
        } else if (orderStatus === 1) {
          color = "geekblue";
          tag = "ON HOLD";
        } else {
          color = "volcano";
          tag = "PROCESSING";
        }
        return (
          <Tag color={color} key={orderStatus}>
            {tag}
          </Tag>
        );
      }
    },
    {
      title: "Update",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <AiOutlineEdit
          className="text-green-500 cursor-pointer"
          title="Update"
          onClick={() => {
            setEditingProductId(_id);
            setVisibleUpdateForm(true);
          }}
        />
      )
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "_id",
      render: (_id) => (
        <Popconfirm
          placement="topRight"
          title="Do you want to delete this product?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => {
            try {
              (async () => {
                const result = await deleteOrderRequest(_id);
                if (result.data.success) {
                  console.log(result.data);
                  getList();
                } else {
                  console.log(result.data);
                }
              })();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <BsFillTrashFill
            className="text-red-500 cursor-pointer"
            title="Delete"
          />
        </Popconfirm>
      )
    }
  ];

  const [visibleUpdateForm, setVisibleUpdateForm] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string>("");
  const [dataSource, setDataSource] = useState<any>();
  const [dataModal, setdataModal] = useState<any>([]);

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="text-center px-8">
      <h1 className="text-3xl font-bold mb-8 mt-4">MANAGE ORDERS</h1>

      <div className="rounded drop-shadow border-1 bg-white">
        <Table
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey="_id"
          rowClassName={(dataSource) => {
            if (dataSource._id === editingProductId) {
              return "bg-blue-200 text-black";
            }
            return "";
          }}
        />
      </div>
      <Modal
        title="Order Information"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {dataSource === undefined
          ? ""
          : dataSource
              .find((product: any) => product._id === editingProductId)
              ?.products.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="py-8 border-b-2 border-b-gray-300"
                  >
                    <div className="flex">
                      <div className="pr-6">
                        <h3 className="font-bold text-base">
                          {item.productId ? item.productId.name : "com"}
                        </h3>
                        <Image
                          width={200}
                          height={150}
                          src={item.productId?.image}
                          alt="bill"
                          className="object-cover mt-2"
                        />
                      </div>
                      <div>
                        <p className="font-bold">Description: </p>

                        <p className="text-base">
                          {item.productId ? item.productId.description : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <p className="w-1/2">Price: {item.price}</p>
                      <p>quantity: {item.amount}</p>
                    </div>
                  </div>
                );
              })}
      </Modal>
      <UpdateOrderStatus
        visible={visibleUpdateForm}
        editingProductId={editingProductId}
        onClose={() => {
          getList();
          setVisibleUpdateForm(false);
        }}
        editData={
          dataSource === undefined
            ? ""
            : dataSource.find(
                (product: any) => product._id === editingProductId
              )
        }
      />
    </div>
  );
};

export default ManageOrderPage;
