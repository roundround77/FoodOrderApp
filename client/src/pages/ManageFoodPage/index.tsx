import { FC, useEffect } from "react";
import { Popconfirm, Table, Image, Button } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import UpdateProduct from "./updateFood";
import { STORAGE } from "../../constants/storage";
import AddFood from "./addFood";
import {
  deleteDishesRequest,
  getDishesRequest
} from "../../services/dish.service";

export interface DataTypeFood {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  status: number;
  restaurant: string;
}

const ManageFoodPage: FC = () => {
  const getList = () => {
    const storageToken = localStorage.getItem(STORAGE.TOKEN);
    if (storageToken) {
      try {
        (async () => {
          const result = await getDishesRequest();
          if (result.data.success) {
            console.log(result.data);
            setDataSource(result.data.data.data);
          }
        })();
      } catch (err) {
        console.error(err);
      }
    } else {
    }
  };
  const columns: ColumnsType<DataTypeFood> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return (
          <Image
            width={50}
            height={50}
            src={image}
            alt="bill"
            style={{ objectFit: "cover" }}
          />
        );
      }
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id"
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Name Restaurant",
      dataIndex: "restaurant",
      key: "name",
      render: (restaurant) => <p>{restaurant ? restaurant.name : ""}</p>
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Price/Unit",
      dataIndex: "price",
      key: "price"
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (id, { status }) => {
        if (status === 1) {
          return "Selling";
        } else {
          return "Unsold";
        }
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
            console.log(_id);

            setEditingUserId(_id);
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
                console.log(_id);

                const result = await deleteDishesRequest(_id);
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
  const [visibleAddForm, setVisibleAddForm] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any>();
  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="text-center px-8">
      <div className="flex flex-col justify-center bg-white mb-4 px-8 rounded drop-shadow border-1 xl:py-6 mt-6">
        <div className="flex xl:flex-row xl:items-center xl:justify-between">
          <span className="text-2xl font-bold mb-4 xl:mb-0 xl:w-[30%] xl:text-left">
            PRODUCTS
          </span>
          <div className="flex ">
            <Button
              type="primary"
              onClick={() => setVisibleAddForm(true)}
              style={{ backgroundColor: "#1890ff" }}
            >
              Add Food
            </Button>
          </div>
        </div>
      </div>
      <div className="rounded drop-shadow border-1 bg-white">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            defaultPageSize: 8
          }}
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
      <UpdateProduct
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
      <AddFood
        visible={visibleAddForm}
        onClose={() => {
          getList();
          setVisibleAddForm(false);
        }}
      />
    </div>
  );
};

export default ManageFoodPage;
