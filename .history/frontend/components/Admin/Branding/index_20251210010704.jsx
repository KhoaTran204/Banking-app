import { Button, Card, Form, Input, message } from "antd";
import Adminlayout from "../../Layout/Adminlayout";
import { EditFilled } from "@ant-design/icons";
import { http, trimData } from "../../../modules/modules";
import { useState, useEffect } from "react";
import Password from "antd/es/input/Password";

const { Item } = Form;

const Branding = () => {
  const [bankForm] = Form.useForm();
  const [messageApi, contex] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [brandings, setBrandings] = useState(null);
  const [no, setNo] = useState(0);

  //get app branding data
  useEffect(() => {
    const fetcher = async () => {
      try {
        const httpReq = http();
        const { data } = await httpReq.get("/api/branding");
        bankForm.setFieldValue(data?.data[0]);
        setBrandings(data?.data[0]);
      } catch (err) {
        messageApi.error("Unable to fetch data !");
      }
    };
    fetcher();
  }, [no]);

  // store bank betails in database
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const finalObj = trimData(values);
      finalObj.bankLogo = photo ? photo : "bankImages/dummy.png";
      const userInfo = {
        fullname: finalObj.fullname,
        email: finalObj.email,
        password: finalObj.password,
        userType: "admin",
        isActive: true,
        profile: "bankImages/dummy.png",
      };

      const httpReq = http();
      await httpReq.post("/api/branding", finalObj);
      await httpReq.post("/api/users", userInfo);
      messageApi.success("Branding created sussessful !");
      bankForm.resetFields();
    } catch (err) {
      messageApi.error("Unable to store branding!");
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
      setPhoto(data.filePath);
    } catch (err) {
      messageApi.error("Unable to upload !");
    }
  };

  return (
    <Adminlayout>
      {contex}
      <Card title="Bank Details" extra={<Button icon={<EditFilled />} />}>
        <Form form={bankForm} layout="vertical" onFinish={onFinish}>
          <div className="grid md:grid-cols-3 gap-x-3">
            <Item
              label="Bank Name"
              name="bankName"
              rules={[{ required: true }]}
            >
              <Input />
            </Item>
            <Item
              label="Bank Tagline"
              name="bankTagline"
              rules={[{ required: true }]}
            >
              <Input />
            </Item>
            <Item label="Bank Logo" name="xyz">
              <Input type="file" onChange={handleUpload} />
            </Item>
            <Item
              label="Bank Acount No"
              name="bankAccountNo"
              rules={[{ required: true }]}
            >
              <Input />
            </Item>
            <Item
              label="Bank Acount Transaction Id"
              name="bankTransactionId"
              rules={[{ required: true }]}
            >
              <Input />
            </Item>
            <Item
              label="Bank Address"
              name="bankAddress"
              rules={[{ required: true }]}
            >
              <Input />
            </Item>
            <Item
              label="Admin Fullname"
              name="fullname"
              rules={[{ required: true }]}
            >
              <Input />
            </Item>
            <Item label="Admin Email" name="email" rules={[{ required: true }]}>
              <Input />
            </Item>
            <Item
              label="Admin Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Item>
            <Item label="Bank LinkedIn" name="bankLinkedIn">
              <Input type="url" />
            </Item>
            <Item label="Bank Twitter" name="bankTwitter">
              <Input type="url" />
            </Item>
            <Item label="Bank Facebook" name="bankFacebook">
              <Input type="url" />
            </Item>
          </div>
          <Item label="Bank description" name="bankDesc">
            <Input.TextArea />
          </Item>
          <Item className="flex justify-end items-center">
            <Button
              loading={loading}
              type="text"
              htmlType="submit"
              className="!bg-blue-500 !text-white !font-bold"
            >
              Submit
            </Button>
          </Item>
        </Form>
      </Card>
    </Adminlayout>
  );
};
export default Branding;
