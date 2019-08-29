import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import DeviceTable from '../../components/DeviceManage/DeviceTable';
import DeviceCard from '../../components/DeviceManage/DeviceCard';
import { getUserMsg } from '../../untils/getStore';
import { Button, Input, Icon } from 'antd';
import { get } from '../../fetch/fetch';
import './DeviceManage.less';
const { Search } = Input;


class DeviceManage extends Component {
  constructor() {
    super();
    this.state = {
      switchPage: true,
      testNum: 1,
      DeviceMsg: [],
      allDeviceId: [],
      refreshdeviceData: []
    }
  }
  componentDidMount() {
    this.getDevice();
  }
  test2 = () => {
    console.log('test2')
    let num = this.state.testNum;
    num++;
    this.setState({
      testNum: num
    })
  }
  switchPageState = () => {
    console.log(getUserMsg())
    this.setState({
      switchPage: !this.state.switchPage
    });
  }
  // 获取设备
  getDevice = () => {
    const user_id = getUserMsg().id;
    const token = getUserMsg().token;
    const url = `/api/MMessage/GetRequestData?op=getdevice&content=${user_id}&user_id=${user_id}&token=${token}`;
    get(url).then(res => res.json()).then(res => {
      let data = JSON.parse(res);
      if (data.status === "success") {
        this.setState({
          DeviceMsg: data.data
        });
        this.getAllDeviceID();
        this.refreshdevice();
      }
    }).catch((e) => {
      console.log(e)
      this.props.history.push('/');
    });
  }
  // 获取所有设备的id
  getAllDeviceID() {
    let idArr = [];
    this.state.DeviceMsg.forEach(items => {
      idArr.push(items.id)
    });
    this.setState({
      allDeviceId: idArr
    });
  }
  // 刷新
  refreshdevice() {
    const reqUrl = `api/MMessage/GetRequestData?op=refreshdevice&content=${this.state.allDeviceId.join(',')},&user_id=${getUserMsg().id}&token=${getUserMsg().token}`;
    get(reqUrl).then(res => res.json()).then(res => {
      let resData = JSON.parse(res);
      if(resData.status === 'success'){
        this.setState({
          refreshdeviceData: resData.data
        });
      }
      console.log(resData)
    }).catch(e => console.log(e))
   }
  render() {
    return (
      <div>
        <Nav />
        <div className="content">
          <div className="tools_box">
            <div className="btn-group">
              <Button icon="edit">批量编辑</Button>
              <Button icon="sync">刷新</Button>
              <Button icon="delete">删除</Button>
            </div>
            <div className="search_box">
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
              <Icon type={this.state.switchPage ? 'bars' : 'appstore'} style={{ fontSize: '0.18rem', marginLeft: '0.2rem' }} onClick={this.switchPageState} />
            </div>
          </div>
          <div className="tips-box">
            已加载全部设备，共{this.state.testNum}个
          </div>
          {
            this.state.switchPage ? (<DeviceCard test2={this.test2} DeviceMsg={this.state.DeviceMsg} refreshdeviceData={this.state.refreshdeviceData}/>) : (<DeviceTable DeviceMsg={this.state.DeviceMsg} refreshdeviceData={this.state.refreshdeviceData}/>)
          }
        </div>
      </div>
    );
  }
}

export default DeviceManage;