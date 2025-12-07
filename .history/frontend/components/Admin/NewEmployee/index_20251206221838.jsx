import { Card, Form, Input } from "antd";
import Adminlayout from "../../Layout/Adminlayout";
// import Item from "antd/es/list/Item";

const { Item } = Form;

const NewEmployee = () => {
  return (
    <Adminlayout>
      <div className="grid md:grid-cols-3 gap-3">
        <Card title="Add new employee">
          <Form layout="vertical">
            <Item label="Profile" name="xyz">
              <Input type="file" />
            </Item>
            <div className="grid md:grid-cols-2 gap-x2">
              <Item
                name="fullname"
                label="Fullname"
                rules={[{ required: true }]}
              >
                <Input />
              </Item>
              <Item name="mobile" label="Mobile" rules={[{ required: true }]}>
                <Input type="number" />
              </Item>
            </div>
          </Form>
        </Card>
        <Card className="md:col-span-2" title="Employee list"></Card>
      </div>
    </Adminlayout>
  );
};
export default NewEmployee;
