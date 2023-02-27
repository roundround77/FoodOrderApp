import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Upload
} from "antd";
import { FC, useEffect, useState } from "react";
import { DataType } from ".";
import { UploadOutlined } from "@ant-design/icons";
import { updateUserRequest } from "../../services/user.Service";

interface IProps {
  visible: boolean;
  editData: DataType | undefined;
  onClose: () => void;
  editingUserId: string;
}

const UpdateCustomer: FC<IProps> = ({
  visible,
  editData,
  onClose,
  editingUserId
}) => {
  const [updateForm] = Form.useForm();
  const { resetFields, setFieldsValue } = updateForm;
  const [date, setDate] = useState<string>("1/08/2022");
  console.log(date);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  useEffect(() => {
    if (editData) {
      const { dateOfBirth, ...resProps } = editData;
      setFieldsValue(resProps);
    } else {
      resetFields();
    }
  }, [editData, setFieldsValue, resetFields]);
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
  const handleSubmit = (values: any) => {
    console.log("Success:", values);
    const { firstName, lastName, gender, password, email } = values;
    console.log(editingUserId);
    try {
      (async () => {
        const result = await updateUserRequest(editingUserId, {
          firstName,
          lastName,
          gender,
          password,
          avatar: fileImage,
          email,
          dateOfBirth: date
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
      title="Update Customer information"
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
            form="updateUserForm"
            style={{ backgroundColor: "#1890ff" }}
          >
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
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Enter first name, please"
                }
              ]}
            >
              <Input placeholder="Enter first mame" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Enter last name, please"
                }
              ]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: "Enter gender, please"
                }
              ]}
            >
              <Select placeholder="Select status">
                <Select.Option value={0}>Male</Select.Option>
                <Select.Option value={1}>Female</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Enter email, please"
                },
                {
                  type: "email",
                  message: "Email invalid"
                }
              ]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Enter password, please"
                },
                {
                  min: 6,
                  message: "at least 6 characters please"
                }
              ]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <DatePicker
              onChange={onChange}
              format={"DD-MM-YYYY"}
              className="mt-7"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="avatar"
              label="Avatar"
              getValueFromEvent={getFile}
              rules={[
                {
                  required: true,
                  message: "Enter avatar, please"
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

export default UpdateCustomer;
