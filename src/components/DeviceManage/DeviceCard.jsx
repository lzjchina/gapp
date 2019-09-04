import React from 'react';
import './DeviceCard.less';

const DeviceCard = (props) => {
  return (
    <div className="deviceCard-box">
      {
        props.DeviceMsg.map(items => {
          return (
            <div className={props.selectDeviceId.has(items.id) ? 'deviceCard active': 'deviceCard'} key={items.id} onClick={() => props.clickDeviceCard(items.id)}>
              <div className="card-top">
                <h3 className="deviceName">{items.name}</h3>
                <div className="btn_group">
                  <i className="btn_edit" title="编辑"></i>
                  <i className="btn_refresh" title="刷新" onClick={() => props.refreshdeviceFunc(items.id)}></i>
                  <i className="btn_delete" title="删除"></i>
                </div>
              </div>
              <ul className="card-content">
                <li className="number">
                  <dl>
                    <dt>{items.mcount}</dt>
                    <dd>屏幕数量(台)</dd>
                  </dl>
                  <dl>
                    <dt>{items.groupcount}</dt>
                    <dd>屏幕分组数量(组)</dd>
                  </dl>
                </li>
                <li className="linkStatus_box">
                  {
                    props.refreshdeviceData.map(eles => {
                      return ((eles.device_id === items.id) ? (<div className="linkStatus" key={eles.device_id}>
                                                                <h5>连接状态:</h5>
                                                                <i className={eles.conn_status === 'Y'? 'online': 'offline'}></i>
                                                                <span className={eles.conn_status === 'Y'? 'green': 'red'}>{eles.conn_status === 'Y'? 'green': '离线'}</span>
                                                              </div>) : null)
                    })
                  }
                  <div className="imitate_checkbox"></div>
                </li>
              </ul>
            </div>
          )
        })
      }
    </div>
  );
}

export default DeviceCard;
