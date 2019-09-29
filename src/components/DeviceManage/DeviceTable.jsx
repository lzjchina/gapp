import React from 'react';
import { Table } from 'antd';
import './DeviceTable.less';

const DeviceTable = (props) => {
  const columns = [
    {
      title: '设备',
      dataIndex: 'device',
      defaultSortOrder: 'descend',
      align: 'center',
    },
    {
      title: '屏幕数量(台)',
      dataIndex: 'screen',
      defaultSortOrder: 'descend',
      align: 'center',
    },
    {
      title: '屏幕分组数量(组)',
      dataIndex: 'group',
      defaultSortOrder: 'descend',
      align: 'center',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '连接状态',
      dataIndex: 'linkState',
      align: 'center',
      filters: [
        {
          text: '在线',
          value: 'Y',
        },
        {
          text: '离线',
          value: 'N',
        },
      ],
      onFilter: (value, record) => record.run_status.indexOf(value) === 0,

      sortDirections: ['descend'],
      render: (text, record, index) => {
        console.log(record)
        return (
          <div className="linkStatus_box">
            {
              props.refreshdeviceData.map(eles => {
                return ((eles.device_id === record.key) ? (<div className="linkStatus" key={eles.device_id}>
                  <i className={eles.conn_status === 'Y' ? 'online' : 'offline'}></i>
                  <span className={eles.conn_status === 'Y' ? 'green' : 'red'}>{eles.conn_status === 'Y' ? 'green' : '离线'}</span>
                </div>) : null)
              })
            }
          </div>
        )
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      render: (text, record, index) => {
        return (
          <div className="btn_group">
            <i className="btn_edit" title="编辑"></i>
            <i className="btn_refresh" title="刷新" onClick={(e) => props.refreshdeviceFunc(e, record.id)}></i>
            <i className="btn_delete" title="删除"></i>
          </div>
        )
      },
    },
  ];
  const data = [];
  props.DeviceMsg.forEach((items, index) => {
    data.push({
      key: items.id,
      device: items.name,
      screen: items.mcount,
      group: items.groupcount,
      run_status: props.refreshdeviceData[index].run_status,
    });
  })

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  function onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }
  return (
    <div >
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} onChange={onChange}></Table>
    </div >
  );
}

export default DeviceTable;