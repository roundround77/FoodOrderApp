import { Button, Col, Drawer, Form, Input, Row, Space, Upload } from "antd";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IRestaurant } from ".";
import {
  createRestaurantsRequest,
  updateRestaurantsRequest
} from "../../services/restaurant.service";

interface IProps {
  visible: boolean;
  editData: IRestaurant | null | undefined;
  onRefreshList: () => void;
  onClose: () => void;
}

const RestaurantForm: FC<IProps> = ({
  visible,
  editData,
  onRefreshList,
  onClose
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [restaurantForm] = Form.useForm();
  const { setFieldsValue, resetFields } = restaurantForm;

  useEffect(() => {
    if (editData) {
      (async () => {
        const { image, ...restProps } = editData;
        setFieldsValue({
          ...restProps
        });
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editData]);

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { image, ...restProps } = values;
      const file = image?.file?.originFileObj;
      const result = editData
        ? await updateRestaurantsRequest(
            editData._id,
            file ? { ...restProps, image: file } : { ...restProps }
          )
        : await createRestaurantsRequest({ ...restProps, image: file });
      if (result.data.success) {
        onRefreshList();
        handleClose();
        toast.success(
          `${editData ? "Updated" : "Created"} restaurant successfully.`
        );
      } else {
        toast.error(result.data.message);
      }
    } catch (err) {
      console.error(err);
      // @ts-ignore
      toast.error(err?.message || "An error occured.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      title={`${editData ? "Update" : "Add"} restaurant`}
      forceRender
      onClose={handleClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <Space>
          <Button onClick={handleClose}>Close</Button>
          <Button
            type="primary"
            htmlType="submit"
            form="restaurantForm"
            loading={loading}
          >
            {editData ? "Update" : "Add"}
          </Button>
        </Space>
      }
      className="overflow-x-auto"
    >
      <Form
        layout="vertical"
        id="restaurantForm"
        form={restaurantForm}
        hideRequiredMark
        onFinish={handleSubmit}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter restaurant name" }
              ]}
            >
              <Input placeholder="Please enter restaurant name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea placeholder="Please enter description" rows={5} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="image"
              label="Image"
              rules={[
                {
                  required: !editData,
                  message: "Please upload restaurant image"
                }
              ]}
            >
              <Upload
                name="image"
                beforeUpload={(file) => {
                  const isImage =
                    file.type === "image/png" ||
                    file.type === "image/jpeg" ||
                    file.type === "image/gif";
                  if (!isImage) {
                    toast.error(`${file.name} is not a image file`);
                  }
                  return isImage || Upload.LIST_IGNORE;
                }}
              >
                <Button>Upload image</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default RestaurantForm;
