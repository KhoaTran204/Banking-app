import { Button, Card, Form, Input, InputNumber, message, Select } from "antd";
import { useEffect, useState } from "react";
import { http } from "../../../modules/modules";
import Customerlayout from "../../Layout/Customerlayout";

const Transfer = () => {
  const [loading, setLoading] = useState(false);
  const [brandings, setBrandings] = useState([]);
  const [form] = Form.useForm();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [messageApi, context] = message.useMessage();

  // fetch branding list
  useEffect(() => {
    const fetchBrandings = async () => {
      try {
        const httpReq = http();
        const { data } = await httpReq.get("/api/branding");
        setBrandings(data.data || data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrandings();
  }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const httpReq = http();

      await httpReq.post("/api/transfer", {
        fromAccountNo: userInfo.accountNo,
        toBrandingId: values.brandingId,
        toBankCardNo: values.bankCardNo,
        amount: values.amount,
      });

      messageApi.success("Transfer success!");
      form.resetFields();
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Customerlayout>
      <Card title="Transfer Money" className="max-w-lg">
        {context}
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="From Account No">
            <Input value={userInfo.accountNo} disabled />
          </Form.Item>

          <Form.Item
            label="Branding"
            name="brandingId"
            rules={[{ required: true, message: "Please select branding" }]}
          >
            <Select placeholder="Select bank">
              {brandings.map((b) => (
                <Select.Option key={b._id} value={b._id}>
                  {b.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Bank Card No"
            name="bankCardNo"
            rules={[{ required: true, message: "Enter bank card number" }]}
          >
            <Input placeholder="Receiver bank card no" />
          </Form.Item>

          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Enter amount" }]}
          >
            <InputNumber className="w-full" min={1} />
          </Form.Item>

          <Button loading={loading} type="primary" htmlType="submit" block>
            Transfer
          </Button>
        </Form>
      </Card>
    </Customerlayout>
  );
};

export default Transfer;
