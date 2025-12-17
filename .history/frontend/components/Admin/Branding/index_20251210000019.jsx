import { Button, Card, Form, Input } from "antd";
import Adminlayout from "../../Layout/Adminlayout";
import { EditFilled } from "@ant-design/icons";

const { Item } = Form;

const Branding = () => {
  const [bankForm] = Form.useForm();

  // store bank betails in database
  const onFinish = async (values) => {
    console.log(values);
  };

  return (
    <Adminlayout>
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
              <Input type="file" />
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
        </Form>
      </Card>
    </Adminlayout>
  );
};
export default Branding;
