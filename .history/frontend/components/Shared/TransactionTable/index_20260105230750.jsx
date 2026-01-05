import React, { useEffect, useState, useCallback } from "react";
import { Table } from "antd";
import { formatDate, http } from "../../../modules/modules";

const TransactionTable = ({ query = {} }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
  });

  const fetchTransactions = useCallback(
    async (pageInfo = pagination) => {
      setLoading(true);

      const searchParams = new URLSearchParams({
        page: pageInfo.current,
        pageSize: pageInfo.pageSize,
      });

      // ✅ dùng trực tiếp từ props
      if (query.accountNo) {
        searchParams.append("accountNo", query.accountNo);
      }

      if (query.branch) {
        searchParams.append("branch", query.branch);
      }

      try {
        const httpReq = http();
        const res = await httpReq.get(
          `/api/transaction/pagination?${searchParams.toString()}`
        );

        setData(res.data.data || []);
        setTotal(res.data.total || 0);
        setPagination({
          current: res.data.page,
          pageSize: res.data.pageSize,
        });
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    },
    [query.accountNo, query.branch, pagination]
  );

  // ✅ fetch khi accountNo / branch / page thay đổi
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
  };

  const columns = [
    {
      title: "Account No",
      dataIndex: "accountNo",
      key: "accountNo",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "Amount",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
    },
    {
      title: "Date",
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
      loading={loading}
      pagination={{
        total,
        current: pagination.current,
        pageSize: pagination.pageSize,
      }}
      onChange={handleTableChange}
    />
  );
};

export default TransactionTable;
