import React from 'react';
import Group from './group';

const List = ({ filter, data, isLoading }) => {
  if (isLoading) {
    return (
      <p>
        Loading....
      </p>
    );
  }
  const showData = data.filter(val => (filter === '' || val.name.indexOf(filter) > -1));
  return (<Group data={showData} />);
};

export default List;
