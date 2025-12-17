import { Card } from "antd";
import EmployeeLayout from "../../Layout/Employeelayout";

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
                onChange={onSearh}
              />
            </div>
          }
        </Card>
      </div>
    </EmployeeLayout>
  );
};
export default NewAccount;
