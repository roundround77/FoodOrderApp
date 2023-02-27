import { Button, Col, Drawer, Form, Input, Row, Space, Upload } from "antd";
import { FC, useEffect, useState } from "react";
import { DataTypeFood } from ".";
import { UploadOutlined } from "@ant-design/icons";
import { updateDishesRequest } from "../../services/dish.service";

interface IProps {
  visible: boolean;
  editData: DataTypeFood | undefined;
  onClose: () => void;
  editingUserId: string;
}

const UpdateProduct: FC<IProps> = ({
  visible,
  editData,
  onClose,
  editingUserId
}) => {
  const [updateForm] = Form.useForm();
  const { resetFields, setFieldsValue } = updateForm;
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
  useEffect(() => {
    if (editData) {
      setFieldsValue(editData);
    } else {
      resetFields();
    }
  }, [editData, setFieldsValue, resetFields]);

  const handleSubmit = (values: any) => {
    console.log("Success:", values);
    const { name } = values;
    try {
      (async () => {
        const result = await updateDishesRequest(editingUserId, {
          image: fileImage,
          name
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

  return (
    <Drawer
      title="Update Food  information"
      forceRender
      onClose={onClose}
      width="50%"
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <Space>
          <Button type="primary" htmlType="submit" form="updateUserForm">
            Update
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Space>
      }
      className="overflow-x-auto"
    >
      <Form
        layout="vertical"
        id="updateUserForm"
        hideRequiredMark
        form={updateForm}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
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
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default UpdateProduct;
