import { Button, Card } from "antd";
import Adminlayout from "../../Layout/Adminlayout";
import { EditFilled } from "@ant-design/icons";

const Branding = () => {
  return (
    <Adminlayout>
      <Card
        title="Bank Details"
        extra={<Button icon={<EditFilled />} />}
      ></Card>
    </Adminlayout>
  );
};
export default Branding;
