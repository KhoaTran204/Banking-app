import { Button, Card, Form, Input, Table } from "antd";
import Adminlayout from "../../Layout/Adminlayout";
import {
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { trimData, http } from "../../../modules/modules";

import swal from "sweetalert";
import { useState } from "react";

// import Item from "antd/es/list/Item";

const { Item } = Form;

const NewEmployee = () => {
  // state collection
  const [empForm] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // create new employee
  const onFinish = async (values) => {
    try {
      setLoading(true);
      let finalObj = trimData(values);
      const httpReq = http();
      const { data } = await httpReq.post("/api/users", finalObj);
      swal("Success", "Employee created !", "success");
      empForm.resetFields();
    } catch (err) {
      if (err?.response?.data?.error?.code === 11000) {
        empForm.setFields([
          {
            name: "email",
            errors: ["Email already exists !"],
          },
        ]);
      } else {
        swal("Warning", "Try again later", "warning");
      }
    } finally {
      setLoading(false);
    }
  };

  //handle upload
  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("photo", file);
      const httpReq = http();
      const { data } = await httpReq.post("/api/upload", formData);
      console.log(data);
    } catch (err) {
      swal("Failed", "unable to upload", "warning");
    }
  };

  // columns for table
  const columns = [
    {
      title: "Profile",
      key: "profile",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-1">
          <Button
            type="text"
            className="!bg-pink-100 !text-pink-500"
            icon={<EyeInvisibleOutlined />}
          />
          <Button
            type="text"
            className="!bg-green-100 !text-green-500"
            icon={<EditOutlined />}
          />
          <Button
            type="text"
            className="!bg-rose-100 !text-rose-500"
            icon={<DeleteOutlined />}
          />
        </div>
      ),
    },
  ];

  return (
    <Adminlayout>
      <div className="grid md:grid-cols-3 gap-3">
        <Card title="Add new employee">
          <Form form={empForm} onFinish={onFinish} layout="vertical">
            <Item label="Profile" name="xyz">
              <Input onChange={handleUpload} type="file" />
            </Item>
            <div className="grid md:grid-cols-2 gap-x2">
              <Item
                name="fullname"
                label="Fullname"
                rules={[{ required: true }]}
              >
                <Input />
              </Item>
              <Item name="mobile" label="Mobile" rules={[{ required: true }]}>
                <Input type="number" />
              </Item>
              <Item name="email" label="Email" rules={[{ required: true }]}>
                <Input />
              </Item>
              <Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input />
              </Item>
              <Item name="Address" label="address">
                <Input.TextArea />
              </Item>
              <Item>
                <Button
                  loading={loading}
                  type="text"
                  htmlType="submit"
                  className="!bg-blue-500 !text-white !font-bold !w-full"
                >
                  Submit
                </Button>
              </Item>
            </div>
          </Form>
        </Card>
        <Card className="md:col-span-2" title="Employee list">
          <Table columns={columns} dataSource={[{}, {}]} />
        </Card>
      </div>
    </Adminlayout>
  );
};
export default NewEmployee;
