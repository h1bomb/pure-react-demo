import React from 'react';
import { Table } from 'antd';

const columns = [{
  title: 'name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'price',
  dataIndex: 'price',
  key: 'price',
}];


export default ({ items }) => (
  <Table dataSource={items} columns={columns} rowKey="name" />
);
