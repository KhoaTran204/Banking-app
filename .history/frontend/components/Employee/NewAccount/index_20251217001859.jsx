import { Card, Input } from "antd";
import EmployeeLayout from "../../Layout/Employeelayout";
import { SearchOutlined } from "@ant-design/icons";

const NewAccount = () => {
  return (
    <EmployeeLayout>
      <div className="grid">
        <Card title="Account List">
          style={{ overflowX: "auto" }}
          extra=
          {
            <div>
              <Input
                placeholder="Search by all"
                prefix={<SearchOutlined />}
                // onChange={onSearh}
              />
            </div>
          }
        </Card>
      </div>
    </EmployeeLayout>
  );
};
export default NewAccount;
