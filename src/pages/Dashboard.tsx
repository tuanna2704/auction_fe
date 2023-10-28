import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button, Modal, Form, Input, message } from 'antd';
import { IBiddingItem } from "utils/interface";
import { formatDate } from "utils/caculate";
import { getBiddingItems, bid, finishBidding } from 'utils/api';
import { useDispatch } from 'react-redux';
import { increaseDepositLock } from 'store/user.reducer';
import { useSelector } from 'react-redux';
import { selectUser } from 'store/user.reducer';

const { TabPane } = Tabs;

const Dashboard = () => {
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [onGoingItems, setOnGoingItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalFinishBiddingSuccess, setIsModalFinishBiddingSuccess] = useState(false);
  const [currentBiddingItem, setCurrentBiddingItem] = useState<IBiddingItem>();
  const [bidPrice, setBidPrice] = useState(0);
  const [content, setContent] = useState('');

  const showModal = (record: IBiddingItem) => {
    setIsModalOpen(true);
    setCurrentBiddingItem(record)
  };

  const handlefinishBidding = async (record: IBiddingItem) => {
    const response = await finishBidding(record.id);

    if (response[0]?.count) {
      const [, winner, ...biddingUsers] = response;
      setIsModalFinishBiddingSuccess(true);
      setContent(`${winner.name} is successfully bid. Refunded for ${biddingUsers.map((user: {name: string}) => user.name).join(', ')}`);
      await getItems('ongoing');
    } else {
      messageApi.open({
        type: 'error',
        content: response.message,
      });
    }
  };

  const handleOk = async () => {
    if (typeof currentBiddingItem?.id !== 'number') return;

    const response = await bid(currentBiddingItem?.id, bidPrice);

    if (response?.success) {
      dispatch(increaseDepositLock(bidPrice));
      handleCancel();
      messageApi.open({
        type: 'success',
        content: `Bidding Item ${currentBiddingItem.name} with price ${bidPrice} Successfully!`,
      });
      await getItems('ongoing');
    } else {
      messageApi.open({
        type: 'error',
        content: response.message,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentBiddingItem(undefined);
  };

  const handleCancelSuccessForm = () => {
    setIsModalFinishBiddingSuccess(false)
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
      render: (text: string, record: IBiddingItem) => {
        return record.depositLock[0]?.amount || record.startPrice
      },
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
        const currentDate = (new Date()).toISOString().split('T')[0];
        const endBidDate = new Date(record.endTime.split('T')[0]);
        const canBid = endBidDate >= new Date(currentDate);
        const canFinish = record.userId === currentUser.id;
        return <>
          {canBid && <Button type="primary" onClick={() => showModal(record)}>Bid</Button>}&nbsp;&nbsp;&nbsp;
          {canFinish && <Button type="primary" onClick={() => handlefinishBidding(record)}>Finish Bidding</Button>}
        </>
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
      setOnGoingItems(response);
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

      <Modal title={`Finish Bidding ${currentBiddingItem?.name} Success`} open={isModalFinishBiddingSuccess} onOk={handleCancelSuccessForm} onCancel={handleCancelSuccessForm}>
          <p>{content}</p>
      </Modal>
      {contextHolder}
    </div>
  );
};

export default Dashboard;
