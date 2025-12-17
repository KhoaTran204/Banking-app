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
          <Item label="Bank Name" name="banName" rules={[{ required: true }]}>
            <Input />
          </Item>
        </Form>
      </Card>
    </Adminlayout>
  );
};
export default Branding;
