import { Card } from "antd";

const Login = () => {
  return (
    <div className="flex">
      <div className="w-1/2 hidden md:flex items-center justify-center">
        <img src="/bank-img.jpg" alt="Bank" className="w-4/5 object-contain" />
      </div>
      <div className="w-1/2 flex items-center justify-center p-6 bg-white">
        <Card>
          <h2 className="text-2xl font-semibold text-center mb-6">Banklogin</h2>
        </Card>
      </div>
    </div>
  );
};
export default Login;
