import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button, Modal, Form, Input } from 'antd';
import { IBiddingItem } from "utils/interface";
import { formatDate } from "utils/caculate";
import { getBiddingItems, bid } from 'utils/api';
import { useDispatch } from 'react-redux';
import { increaseDepositLock } from 'store/user.reducer';
const { TabPane } = Tabs;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [onGoingItems, setOnGoingItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBiddingItem, setCurrentBiddingItem] = useState<IBiddingItem>();
  const [bidPrice, setBidPrice] = useState(0);

  const showModal = (record: IBiddingItem) => {
    setIsModalOpen(true);
    setCurrentBiddingItem(record)
  };

  const handleOk = async () => {
    if (typeof currentBiddingItem?.id !== 'number') return;

    const response = await bid(currentBiddingItem?.id, bidPrice);

    if (response.success) {
      dispatch(increaseDepositLock(bidPrice));
      handleCancel();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentBiddingItem(undefined);
  };

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
      <Modal title={`Bidding Item ${currentBiddingItem?.name}`} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <br />
        <Form.Item label="Bid Price" name="bidPrice" rules={[{ required: true, message: 'Please enter the bid price' }]}>
          <Input type="number" placeholder="Enter bid price" value={bidPrice}
              onChange={(e) => setBidPrice(Number(e.target.value))} />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default Dashboard;
