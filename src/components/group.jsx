import React from 'react';
import { Card } from 'antd';
import Items from './items';

const Group = ({ data }) => {
  const groupArr = {};
  data.forEach((item) => {
    if (groupArr[item.type]) {
      groupArr[item.type].push(item);
    } else {
      groupArr[item.type] = [item];
    }
  });
  const keys = Object.keys(groupArr);
  return keys.map(key => (
    <Card
      title={key}
      key={Math.random()}
    >
      <Items key={Math.random()} items={groupArr[key]} />
    </Card>));
};

export default Group;
