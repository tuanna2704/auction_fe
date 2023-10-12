import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button } from 'antd';
import { IBiddingItem } from "utils/interface";
import { formatDate } from "utils/caculate";
import { getBiddingItems } from 'utils/api';

const { TabPane } = Tabs;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const [onGoingItems, setOnGoingItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);

  const showModal = (item: IBiddingItem) => {
    console.log(item);
  }

  const BIDDING_COLUMNS = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Current Price',
      dataIndex: 'startPrice',
      key: 'startPrice',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (text: string, record: IBiddingItem) => {
        return (
          <div>{formatDate(new Date(record.startTime))} ~ {formatDate(new Date(record.endTime))}</div>
        )
      },
    },
    {
      title: 'Bid',
      dataIndex: 'bid',
      key: 'bid',
      render: (text: string, record: IBiddingItem) => {
        const canBid = new Date(record.endTime) > new Date();
        return canBid && <Button type="primary" onClick={() => showModal(record)}>Bid</Button>
      },
    },
  ];

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    getItems(tabName);
  };

  const getItems = async (type: string) => {
    if (type === 'ongoing') {
      const response = await getBiddingItems('ongoing');
      setOnGoingItems(response)
    } else if (type === 'completed') {
      const response = await getBiddingItems('completed');
      setCompletedItems(response);
    }
  };

  useEffect(() => {
    getItems('ongoing');
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Ongoing" key="ongoing">
          <Table columns={BIDDING_COLUMNS} dataSource={onGoingItems} />
        </TabPane>
        <TabPane tab="Completed" key="completed">
          <Table columns={BIDDING_COLUMNS} dataSource={completedItems} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Dashboard;
