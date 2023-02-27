import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import { FC, useEffect, useState } from "react";
import { DataTypeOrder } from ".";
import { STORAGE } from "../../constants/storage";
import { getDishesRequest } from "../../services/dish.service";
import {
  getOrdersListRequest,
  updateOrderRequest
} from "../../services/order.service";
const { Option } = Select;

interface IProps {
  visible: boolean;
  editData: DataTypeOrder | undefined;
  onClose: () => void;
  editingProductId: string;
}

const UpdateOrderStatus: FC<IProps> = ({
  visible,
  editData,
  onClose,
  editingProductId
}) => {
  const [updateForm] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Success:", values);
    try {
      (async () => {
        const result = await updateOrderRequest(editingProductId, {
          products: [values]
        });
        if (result.data.success) {
          onClose();
          console.log(result.data);
        }
      })();
    } catch (err) {
      console.error(err);
    }
  };
  const [dataUpdate, setDataUpdate] = useState<any>();
  const [dataFood, setDataFood] = useState<any>();
  useEffect(() => {
    const storageToken = localStorage.getItem(STORAGE.TOKEN);
    if (storageToken) {
      try {
        (async () => {
          const result = await getDishesRequest();
          if (result.data.success) {
            setDataFood(result.data.data.data);
          }
        })();
      } catch (err) {
        console.error(err);
      }
    } else {
    }
  }, []);

  useEffect(() => {
    const storageToken = localStorage.getItem(STORAGE.TOKEN);
    if (storageToken) {
      try {
        (async () => {
          const result = await getOrdersListRequest();
          if (result.data.success) {
            result.data.data.data.map((order: any) => {
              if (order._id === editingProductId) {
                setDataUpdate(order.products);
              }
            });
          }
        })();
      } catch (err) {
        console.error(err);
      }
    } else {
    }
  }, [editData, editingProductId]);

  return (
    <Drawer
      title={"OrderID: " + editData?._id}
      forceRender
      onClose={onClose}
      width="50%"
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <Space>
          <Button type="primary" htmlType="submit" form="updateOrderForm">
            Update
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Space>
      }
      className="overflow-x-auto"
    >
      <Form
        layout="vertical"
        id="updateOrderForm"
        hideRequiredMark
        form={updateForm}
        onFinish={handleSubmit}
      >
        {dataUpdate === undefined
          ? ""
          : dataUpdate.map((item: any, index: number) => {
              return (
                <Row gutter={16} key={index}>
                  <Col span={12}>
                    <Form.Item
                      name="productId"
                      label="Food"
                      rules={[
                        {
                          required: true,
                          message: "Enter Food, please"
                        }
                      ]}
                    >
                      <Select placeholder="Select status">
                        {dataFood
                          ? dataFood.map((food: any, index: number) => (
                              <Option key={index} value={food._id}>
                                {food.name}
                              </Option>
                            ))
                          : ""}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="amount"
                      label="Quantity"
                      rules={[
                        {
                          required: true,
                          message: "Enter Quantity, please"
                        }
                      ]}
                    >
                      <Input placeholder="Enter name" />
                    </Form.Item>
                  </Col>
                </Row>
              );
            })}
      </Form>
    </Drawer>
  );
};

export default UpdateOrderStatus;
