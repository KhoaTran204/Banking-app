import { Button, Card, Input } from "antd";
import EmployeeLayout from "../../Layout/Employeelayout";
import { SearchOutlined } from "@ant-design/icons";

const NewAccount = () => {
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
            dataSource={allEmployee}
            scroll={{ x: "max-content" }}
          />
        </Card>
      </div>
    </EmployeeLayout>
  );
};
export default NewAccount;
