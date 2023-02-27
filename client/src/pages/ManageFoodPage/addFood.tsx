import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload
} from "antd";
import { FC, useEffect, useState } from "react";
import { STORAGE } from "../../constants/storage";
import { UploadOutlined } from "@ant-design/icons";
import { getRestaurantsRequest } from "../../services/restaurant.service";
import { addDishesRequest } from "../../services/dish.service";

interface IProps {
  visible: boolean;
  onClose: () => void;
}
const { Option } = Select;
const AddFood: FC<IProps> = ({ visible, onClose }) => {
  const [addForm] = Form.useForm();
  const [dataRes, setdataRes] = useState<any>();
  const [fileImage, setFileImage] = useState<any>(null);

  const getFile = (e: any) => {
    console.log("Upload event:", e.file);
    setFileImage(e.file);
    if (Array.isArray(e)) {
      return e;
    } else {
      return e && e.fileList;
    }
  };
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    const { restaurant, name, price, description, status } = values;
    try {
      (async () => {
        const result = await addDishesRequest({
          restaurant,
          name,
          price,
          description,
          status,
          image: fileImage
        });
        if (result.data.success) {
          console.log(result.data);
          onClose();
        }
      })();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const storageToken = localStorage.getItem(STORAGE.TOKEN);
    if (storageToken) {
      try {
        (async () => {
          const result = await getRestaurantsRequest();
          if (result.data.success) {
            setdataRes(result.data.data);
          } else {
          }
        })();
      } catch (err) {
        console.error(err);
      }
    } else {
    }
  }, []);

  return (
    <Drawer
      title="Add Fodd"
      forceRender
      onClose={onClose}
      width="50%"
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            form="addFoodForm"
            style={{ backgroundColor: "#1890ff" }}
          >
            Add
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Space>
      }
      className="overflow-x-auto"
    >
      <Form
        layout="vertical"
        id="addFoodForm"
        hideRequiredMark
        form={addForm}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="restaurant"
              label="Restaurant"
              rules={[
                {
                  required: true,
                  message: "Enter restaurant, please"
                }
              ]}
            >
              <Select placeholder="Select status">
                {dataRes
                  ? dataRes.map((res: any, index: number) => (
                      <Option key={index} value={res._id}>
                        {res.name}
                      </Option>
                    ))
                  : ""}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Enter name, please"
                }
              ]}
            >
              <Input placeholder="Enter name" id="name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Enter unitPrice, please"
                }
              ]}
            >
              <Input placeholder="Enter unitPrice" id="unitPrice" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Enter description, please"
                }
              ]}
            >
              <Input placeholder="Enter description" id="description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                  message: "Enter status, please"
                }
              ]}
            >
              <Select placeholder="Select status">
                <Option value={1}>Selling</Option>
                <Option value={2}>Unsold</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="image"
              label="Image"
              getValueFromEvent={getFile}
              rules={[
                {
                  required: true,
                  message: "Enter image, please"
                }
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Choose Image</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddFood;
