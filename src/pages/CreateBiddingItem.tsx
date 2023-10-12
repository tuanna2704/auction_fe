import React from 'react';
import { Form, Input, Button, Modal, DatePicker, Checkbox } from 'antd';
import { createBiddingItem } from 'utils/api';
import { useDispatch } from 'react-redux';
import { BiddingItemStateType } from 'utils/interface';
import { formatDateToISO8601WithoutTime } from 'utils/caculate';

const CreateBiddingItem = () => {
  const dispatch = useDispatch()
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

  const onFinish = async ({ publish, name, price, dateRange}: { publish: boolean, name: string, price: number, dateRange: [{$d: Date}, {$d: Date}] }) => {
    console.log(dateRange)
    const formatedValues = {
      state: (publish ? 'PUBLISHED' : 'DRAFT') as BiddingItemStateType,
      name,
      startPrice: Number(price),
      startTime: formatDateToISO8601WithoutTime(dateRange[0].$d),
      endTime: formatDateToISO8601WithoutTime(dateRange[1].$d)
    }
    const response = await createBiddingItem(formatedValues);

    if (response.success) {
      modal.success({
        title: 'Create Item Success',
        content: <></>
      })
      form.resetFields();
    } else {
      await modal.error({
        content: <>{response.message}</>
      });
    }
  };

  return (
    <div style={{ textAlign: "center", width: "50%", margin: "50px auto" }}>
      <h2>Create Bidding Item</h2>
      <Form
        form={form}
        name="createBiddingItem"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please enter a name',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please enter a price',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Date Range"
          name="dateRange"
          rules={[
            {
              required: true,
              message: 'Please select a date range',
            },
          ]}
        >
          <DatePicker.RangePicker />
        </Form.Item>

        <Form.Item name="publish" valuePropName="checked" wrapperCol={{ offset: 6, span: 14 }}>
          <Checkbox> Publish</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default CreateBiddingItem;
