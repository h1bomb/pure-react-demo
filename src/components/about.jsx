import React from 'react';
import { Alert, Spin } from 'antd';
import LoadData from './loaddata';

export default () => (
  <LoadData url="/stub.json">
    {(data, isLoading) => {
      if (isLoading) {
        return (<Spin />);
      }
      return (
        <Alert
          message="Try UI"
          description={JSON.stringify(data)}
          type="info"
          showIcon
        />
      );
    }}
  </LoadData>
);
