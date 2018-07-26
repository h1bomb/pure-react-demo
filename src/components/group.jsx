import React from 'react';
import { Card } from 'antd';
import Items from './items';

function withGroup(WarpComponent, ListCompont) {
  const Group = (({ data }) => {
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
      <WarpComponent
        title={key}
        key={key}
      >
        <ListCompont key={key} items={groupArr[key]} />
      </WarpComponent>));
  });
  return Group;
}

export default withGroup(Card, Items);
