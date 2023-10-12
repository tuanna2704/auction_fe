import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { MoneyCollectFilled } from '@ant-design/icons';
import { addDeposit } from 'utils/api';
import { useDispatch } from 'react-redux';
import { increaseDeposit } from 'store/user.reducer';


const isNumber = (rule: object, value: any, callback: Function) => {
  if (!Number.isNaN(Number(value))) {
    callback();
  } else {
    callback('Please enter a valid number');
  }
};

const AddDeposit = () => {
  const dispatch = useDispatch()
  const [modal, contextHolder] = Modal.useModal();
  const [form] = Form.useForm();

  const onFinish = async ({ amount }: {amount: number}) => {
    const response = await addDeposit(Number(amount));

    if (response.success) {
      modal.success({
        title: 'Add Deposit Success',
        content: <></>
      })
      dispatch(increaseDeposit(Number(amount)));
      form.resetFields();
    } else {
      await modal.error({
        content: <>{response.message}</>
      });
    }
  };

  return (
    <div style={{ textAlign: "center", width: "300px", margin: "50px auto" }}>
      <h2>Add Deposit</h2>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
        name="amount"
        label="Number"
        rules={[
          {
            required: true,
            message: 'Please input a number!',
          },
          {
            validator: isNumber,
          },
        ]}
      >
          <Input
            prefix={<MoneyCollectFilled className="site-form-item-icon" />}
            placeholder="Enter Amount"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export default AddDeposit;
