import React from 'react';

const DeviceTable = (props) => {
  const test = () => {
    console.log('test')
  }
  return (
    <div onClick={test}>
      table
    </div >
  );
}

export default DeviceTable;