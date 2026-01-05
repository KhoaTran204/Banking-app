import React, { useEffect, useState } from "react";
import { Table, Image } from "antd";
import { http, formatDate } from "../../../modules/modules";

const AccountTable = ({ query = {}, currentUserType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const httpReq = http();
      const res = await httpReq.get("/api/users");

      let users = res.data.data || [];

      // 1️⃣ Loc theo role nguoi dang nhap
      if (currentUserType === "admin") {
        users = users.filter((u) => u.userType === "employee");
      }

      if (currentUserType === "employee") {
        users = users.filter((u) => u.userType === "customer");
      }

      // 2️⃣ Loc theo branch neu co
      if (query.branch) {
        users = users.filter((u) => u.branch === query.branch);
      }

      // 3️⃣ Sort + gioi han 3 dong
      users = users
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setData(users);
    } catch (err) {
      console.error("Failed to fetch accounts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [query, currentUserType]);

  const columns = [
    {
      title: "Profile",
      key: "profile",
      render: (_, obj) => (
        <Image
          src={`${import.meta.env.VITE_BASEURL}/${obj.profile}`}
          width={40}
          height={40}
          className="rounded-full"
        />
      ),
    },
    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      render: (text) => (
        <span
          className={`capitalize ${
            text === "admin"
              ? "text-indigo-500"
              : text === "employee"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Fullname",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Balance",
      dataIndex: "finalBalance",
      key: "finalBalance",
      render: (v) => v ?? 0, // tranh loi NaN
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d) => formatDate(d),
    },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={data}
      pagination={false}
      loading={loading}
      scroll={{ x: "max-content" }}
    />
  );
};

export default AccountTable;
