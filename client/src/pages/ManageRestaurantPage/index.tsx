import { Button, Popconfirm, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { FC, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import {
  deleteRestaurantRequest,
  getRestaurantsRequest
} from "../../services/restaurant.service";
import RestaurantForm from "./RestaurantForm";

export interface IRestaurant {
  _id: string;
  name: string;
  image: string;
  description: string;
}

const ManageRestaurantPage: FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [editingRestaurantId, setEditingRestaurantId] = useState<string>("");
  const [visibleUpdateForm, setVisibleUpdateForm] = useState<boolean>(false);
  const [loadingRestaurants, setLoadingRestaurants] = useState<boolean>(false);

  const handleGetData = async () => {
    try {
      setLoadingRestaurants(true);
      const result = await getRestaurantsRequest();
      if (result.data.success) {
        setRestaurants(result.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRestaurants(false);
    }
  };

  const columns: ColumnsType<IRestaurant> = [
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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imgLink) => (
        <img
          src={imgLink}
          alt="restaurant"
          width={60}
          height={40}
          className="object-cover"
        />
      )
    },
    {
      title: "Update",
      dataIndex: "_id",
      key: "update",
      render: (_id) => (
        <AiOutlineEdit
          className="text-green-500 cursor-pointer"
          title="Update"
          onClick={() => {
            setEditingRestaurantId(_id);
            setVisibleUpdateForm(true);
          }}
        />
      )
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "delete",
      render: (_id) => (
        <Popconfirm
          placement="topRight"
          title="Do you want to delete this restaurant?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            try {
              setLoadingRestaurants(true);
              const result = await deleteRestaurantRequest(_id);
              if (result.data.success) {
                handleGetData();
                toast.success("Deleted restaurant successfully.");
              } else {
                toast.error(result.data.message);
              }
            } catch (err) {
              console.error(err);
              // @ts-ignore
              toast.error(err?.message || "An error occured.");
            } finally {
              setLoadingRestaurants(false);
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

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div className="text-center px-8">
      <h1 className="text-3xl font-bold mb-8 mt-4">MANAGE RESTAURANTS</h1>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          onClick={() => {
            setEditingRestaurantId("");
            setVisibleUpdateForm(true);
          }}
        >
          Add restaurant
        </Button>
      </div>
      <div className="rounded drop-shadow border-1 bg-white">
        <Table
          columns={columns}
          dataSource={restaurants}
          size="small"
          rowKey="_id"
          rowClassName={(dataSource) => {
            if (dataSource._id === editingRestaurantId) {
              return "bg-blue-200 text-black";
            }
            return "";
          }}
          loading={loadingRestaurants}
        />
      </div>
      <RestaurantForm
        visible={visibleUpdateForm}
        onClose={() => {
          setEditingRestaurantId("");
          setVisibleUpdateForm(false);
        }}
        onRefreshList={handleGetData}
        editData={
          editingRestaurantId
            ? restaurants.find(
                (restaurant) => restaurant._id === editingRestaurantId
              )
            : null
        }
      />
    </div>
  );
};

export default ManageRestaurantPage;
