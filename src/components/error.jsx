import React from 'react';
import { Alert } from 'antd';

export default ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <Alert
      message="Error"
      description={message}
      type="error"
      closable
    />
  );
};
