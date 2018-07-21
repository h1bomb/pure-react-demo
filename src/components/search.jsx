import React from 'react';
import { Input } from 'antd';

const Search = ({ value, setValue }) => (
  <Input placeholder="search" value={value} onChange={setValue} />
);

export default Search;
