import { Button, Card, Form, Input, InputNumber, message, Select } from "antd";
import { useState } from "react";
import { http } from "../../../modules/modules";

const Transfer = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [messageApi, context] = message.useMessage();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const httpReq = http();

      await httpReq.post("/api/transfer", {
        fromAccountNo: userInfo.accountNo,
        toBankCardNo: values.bankCardNo,
        amount: values.amount,
        branch: userInfo.branch,
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
    <Card title="Transfer Money" className="max-w-lg">
      {context}
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="From Account No">
          <Input value={userInfo.accountNo} disabled />
        </Form.Item>

        <Form.Item
          label="Bank Card No"
          name="bankCardNo"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter receiver bank card no" />
        </Form.Item>

        <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
          <InputNumber className="w-full" min={1} placeholder="Enter amount" />
        </Form.Item>

        <Button loading={loading} type="primary" htmlType="submit" block>
          Transfer
        </Button>
      </Form>
    </Card>
  );
};

export default Transfer;
