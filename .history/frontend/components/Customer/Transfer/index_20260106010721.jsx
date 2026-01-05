import { Button, Card, Form, Input, InputNumber, message, Select } from "antd";
import { useEffect, useState } from "react";
import { http, fetchData } from "../../../modules/modules";
import Customerlayout from "../../Layout/Customerlayout";
import useSWR from "swr";

const { Item } = Form;

const Transfer = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, context] = message.useMessage();

  // lấy userInfo ngầm (KHÔNG HIỂN THỊ)
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  // lấy branding giống NewAccount
  const { data: brandings } = useSWR("/api/branding", fetchData, {
    revalidateOnFocus: false,
  });

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const httpReq = http();

      await httpReq.post("/api/transfer", {
        fromAccountNo: Number(userInfo.accountNo),
        toBrandingId: values.brandingId,
        toBankCardNo: values.bankCardNo,
        amount: Number(values.amount),
      });

      messageApi.success("Transfer successfully!");
      form.resetFields();
    } catch (err) {
      messageApi.error(err?.response?.data?.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Customerlayout>
      {context}

      <Card
        title="Transfer Money"
        className="max-w-lg"
        extra={
          <span className="text-gray-500 text-sm">
            Transfer money to another bank account
          </span>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* ===== BRANDING ===== */}
          <Item
            label="Bank (Branding)"
            name="brandingId"
            rules={[{ required: true, message: "Please select bank" }]}
          >
            <Select placeholder="Select bank">
              {brandings?.data?.map((b) => (
                <Select.Option key={b._id} value={b._id}>
                  {b.bankName}
                </Select.Option>
              ))}
            </Select>
          </Item>

          {/* ===== BANK CARD NO ===== */}
          <Item
            label="Receiver Bank Card Number"
            name="bankCardNo"
            rules={[
              { required: true, message: "Please enter bank card number" },
            ]}
          >
            <Input placeholder="Enter receiver bank card number" />
          </Item>

          {/* ===== AMOUNT ===== */}
          <Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber
              className="w-full"
              min={1}
              placeholder="Enter transfer amount"
            />
          </Item>

          {/* ===== DESCRIPTION ===== */}
          <Item label="Description" name="description">
            <Input.TextArea
              placeholder="Optional note (e.g. Rent payment, Gift, ...)"
              rows={3}
            />
          </Item>

          <Button
            loading={loading}
            type="text"
            htmlType="submit"
            className="!font-semibold !text-white !bg-blue-500"
            block
          >
            Submit Transfer
          </Button>
        </Form>
      </Card>
    </Customerlayout>
  );
};

export default Transfer;
