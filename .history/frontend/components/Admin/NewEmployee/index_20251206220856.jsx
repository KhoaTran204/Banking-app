import { Card } from "antd";
import Adminlayout from "../../Layout/Adminlayout";

const NewEmployee = () => {
  return (
    <Adminlayout>
      <div className="grid md:grid-cols-3 gap-3">
        <Card title="Add new employee"></Card>
        <Card className="md:col-span-2" title="Employee list"></Card>
      </div>
    </Adminlayout>
  );
};
export default NewEmployee;
