import { FC, useEffect } from "react";
import { Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import UpdateCustomer from "./UpdateUser";

import { STORAGE } from "../../constants/storage";
import { deleteUserRequest, getUserRequest } from "../../services/user.Service";
import moment from "moment";
import { BsFillTrashFill } from "react-icons/bs";
export interface DataType {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: number;
  dateOfBirth: string;
  password: string;
  address: string;
}
const ManageUserPage: FC = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Customer Id",
      dataIndex: "_id",
      key: "_id"
    },
    {
      title: "Full Name",
      dataIndex: "_id",
      key: "_id",
      render: (_id, item) => {
        return `${item.firstName} ${item.lastName}`;
      }
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => {
        if (gender === 0) {
          return "Male";
        } else {
          return "Female";
        }
      }
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirthl",
      render: (dateOfBirthl) =>
        dateOfBirthl ? moment(dateOfBirthl).format("DD-MM-YYYY") : ""
    },
    {
      title: "Update",
      dataIndex: "_id",
      key: "_id",
      render: (id) => (
        <AiOutlineEdit
          className="text-green-500 cursor-pointer"
          title="Update"
          onClick={() => {
            setEditingUserId(id);
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
                const result = await deleteUserRequest(_id);
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
  const [editingUserId, setEditingUserId] = useState<string>("");
  const [dataSource, setDataSource] = useState<any>();
  const getList = () => {
    const storageToken = localStorage.getItem(STORAGE.TOKEN);
    if (storageToken) {
      try {
        (async () => {
          const result = await getUserRequest();
          if (result.data.success) {
            setDataSource(result.data.data.data);
          }
        })();
      } catch (err) {
        console.error(err);
      }
    } else {
    }
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="text-center px-8">
      <h1 className="text-3xl font-bold mb-10 mt-4">MANAGE CUSTOMERS</h1>

      <div className="rounded drop-shadow border-1 bg-white">
        <Table
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey="_id"
          rowClassName={(dataSource) => {
            if (dataSource._id === editingUserId) {
              return "bg-blue-200 text-black";
            }
            return "";
          }}
        />
      </div>

      <UpdateCustomer
        editingUserId={editingUserId}
        visible={visibleUpdateForm}
        onClose={() => {
          getList();
          setVisibleUpdateForm(false);
        }}
        editData={
          dataSource === undefined
            ? ""
            : dataSource.find((user: any) => user._id === editingUserId)
        }
      />
    </div>
  );
};

export default ManageUserPage;
