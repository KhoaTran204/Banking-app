import { Button, Card, DatePicker, Form, Input, Modal, Table } from "antd";
import EmployeeLayout from "../../Layout/Employeelayout";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Item } = Form;

const NewAccount = () => {
  const [accountForm] = Form.useForm();

  // states collections
  const [accountModal, setAccountModal] = useState(true);

  // columns for table
  const columns = [
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "User type",
      dataIndex: "userType",
      key: "userType",
      render: (text) => {
        if (text === "admin") {
          return <span className="capitalize text-indigo-500">{text}</span>;
        } else if (text === "employee") {
          return <span className="capitalize text-green-500">{text}</span>;
        } else {
          return <span className="capitalize text-red-500">{text}</span>;
        }
      },
    },
    {
      title: "Account No",
      dataIndex: "accountNo",
      key: "accountNo",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
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
      title: "Photo",
      key: "photo",
      render: (src, obj) => (
        <Image
          src={`${import.meta.env.VITE_BASEURL}/${obj.profile}`}
          className="rounded-full"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: "Doccument",
      key: "doccument",
      render: (src, obj) => (
        <Image
          src={`${import.meta.env.VITE_BASEURL}/${obj.profile}`}
          className="rounded-full"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: "Signature",
      key: "signature",
      render: (src, obj) => (
        <Image
          src={`${import.meta.env.VITE_BASEURL}/${obj.profile}`}
          className="rounded-full"
          width={40}
          height={40}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, obj) => (
        <div className="flex gap-1">
          <Popconfirm
            title="Are you sure ?"
            description="Once you update, you can also re-update !"
            onCancel={() => messageApi.info("No chances occur  !")}
            onConfirm={() => updateIsActive(obj._id, obj.isActive)}
          >
            <Button
              type="text"
              className={`${
                obj.isActive
                  ? "!bg-indigo-100 !text-indigo-500"
                  : "!bg-pink-100 !text-pink-500"
              }`}
              icon={obj.isActive ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            />
          </Popconfirm>
          <Popconfirm
            title="Are you sure ?"
            description="Once you update, you can also re-update !"
            onCancel={() => messageApi.info("No chances occur  !")}
            onConfirm={() => onEditUser(obj)}
          >
            <Button
              type="text"
              className="!bg-green-100 !text-green-500"
              icon={<EditOutlined />}
            />
          </Popconfirm>
          <Popconfirm
            title="Are you sure ?"
            description="Once you delete, you can't also re-update !"
            onCancel={() => messageApi.info("Your data is safe !")}
            onConfirm={() => onDeleteUser(obj._id)}
          >
            <Button
              type="text"
              className="!bg-rose-100 !text-rose-500"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <EmployeeLayout>
      <div className="grid">
        <Card
          title="Account List"
          style={{ overflowX: "auto" }}
          extra={
            <div className="flex gap-x-3">
              <Input
                placeholder="Search by all"
                prefix={<SearchOutlined />}
                // onChange={onSearh}
              />
              <Button
                onClick={() => setAccountModal(true)}
                type="text"
                className="!font-bold !bg-blue-500 !text-white"
              >
                Add new account
              </Button>
            </div>
          }
        >
          <Table
            columns={columns}
            dataSource={[]}
            scroll={{ x: "max-content" }}
          />
        </Card>
      </div>
      <Modal
        open={accountModal}
        onCancel={() => setAccountModal(false)}
        width={820}
        footer={null}
        title="Open New Account"
      >
        <Form layout="vertical" onFinish={onFinish} form={accountForm}>
          <div className="grid md-cols-3 gap-x-3">
            <Item
              label="Account No"
              name="accountNo"
              rules={[{ required: true }]}
            >
              <Input placeholder="Account no" />
            </Item>
            <Item label="Fullname" name="fullname" rules={[{ required: true }]}>
              <Input placeholder="Enter fullname" />
            </Item>
            <Item label="Mobile" name="mobile" rules={[{ required: true }]}>
              <Input placeholder="Enter mobile" />
            </Item>
            <Item
              label="Fathername"
              name="fathername"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter fathername" />
            </Item>
            <Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="Enter email" />
            </Item>
            <Item label="Password" name="password" rules={[{ required: true }]}>
              <Input placeholder="Enter password" />
            </Item>
            <Item label="DOB" name="dob" rules={[{ required: true }]}>
              <DatePicker className="w-full" />
            </Item>
          </div>
        </Form>
      </Modal>
    </EmployeeLayout>
  );
};
export default NewAccount;
