import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited doesn't exist."
    extra={
      <Link to="/">
        <Button type="text" className="!bg-blue-500 !text-white !font-bold">
          Go to home page
        </Button>
      </Link>
    }
  />;
};
export default PageNotFound;
