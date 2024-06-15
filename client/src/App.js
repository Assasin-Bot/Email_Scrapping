import React, { useEffect, useState } from "react";
import { Table, Button, Spin } from "antd";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
    render: (text) => <a href="#">{text}</a>,
  },
  {
    title: "Reward",
    className: "column-money",
    dataIndex: "reward",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
];

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch("http://localhost:5000/api/email"); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();
      setData(json);
      console.log(json);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin fullscreen size="30px" />;

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      title={() => (<Button loading={loading} onClick={fetchData}>Load</Button>)}
    />
  );
};

export default App;
