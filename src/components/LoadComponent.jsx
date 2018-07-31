import React from 'react';

const LoadComponent = Component => (props) => {
  let Com = null;
  const { loading } = props;
  if (loading) {
    Com = (
      <div>
        loading...
      </div>
    );
  }
  return (
    <div>
      {Com}
      <Component {...props} />
    </div>
  );
};

export default LoadComponent;
