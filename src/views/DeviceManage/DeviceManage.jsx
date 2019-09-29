import React, { Component } from 'react';
import Nav from '../../components/Nav/Nav';
import DeviceTable from '../../components/DeviceManage/DeviceTable';
import DeviceCard from '../../components/DeviceManage/DeviceCard';
import { getUserMsg } from '../../untils/getStore';
import { Button, Input, Icon, message, Checkbox } from 'antd';
import { get } from '../../fetch/fetch';
import './DeviceManage.less';
const { Search } = Input;


class DeviceManage extends Component {
  constructor() {
    super();
    this.state = {
      switchPage: true,
      DeviceMsg: [],
      allDeviceId: [],
      deviceNum: 0,
      refreshdeviceData: [],
      selectDeviceId: new Map()
    }
  }
  componentDidMount() {
    this.getDevice();
  }
  componentDidUpdate() {
    // console.log(this.state.selectDeviceId)
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
          DeviceMsg: data.data,
          deviceNum: data.data.length
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
  refreshdevice = (e, id = '') => {
    if (e) {
      e.stopPropagation();
    }
    let tempId;
    id === '' ? tempId = this.state.allDeviceId.join(',') : tempId = id;
    const reqUrl = `api/MMessage/GetRequestData?op=refreshdevice&content=${tempId},&user_id=${getUserMsg().id}&token=${getUserMsg().token}`;
    get(reqUrl).then(res => res.json()).then(res => {
      let resData = JSON.parse(res);
      if (resData.status === 'success') {
        this.setState({
          refreshdeviceData: resData.data
        });
        message.success('success');
      }
      // console.log(resData)
    }).catch(e => console.log(e))
  }
  // 点击选择设备
  clickDeviceCard = (id = "") => {
    if (this.state.selectDeviceId.has(id)) {
      this.state.selectDeviceId.delete(id);
      this.setState({
        selectDeviceId: this.state.selectDeviceId
      })
    } else {
      this.setState({
        selectDeviceId: this.state.selectDeviceId.set(id, id)
      })
    }
  }
  // 全选
  onChange = (e) => {
    // console.log(e.target.checked)
    if (e.target.checked) {
      this.state.selectDeviceId.clear();
      this.state.allDeviceId.forEach(items => {
        this.setState({
          selectDeviceId: this.state.selectDeviceId.set(items, items)
        })
      });
    } else {
      this.state.allDeviceId.forEach(items => {
        this.state.selectDeviceId.delete(items);
        this.setState({
          selectDeviceId: this.state.selectDeviceId
        })
      });
    }
  }
  render() {
    return (
      <div>
        <Nav />
        <div className="content">
          <div className="tools_box">
            <div className="btn-group">
              <Button icon="edit">批量编辑</Button>
              <Button icon="sync" onClick={() => this.getDevice()}>刷新</Button>
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
            {
              this.state.switchPage ? (<Checkbox onChange={(e) => this.onChange(e)}>全选,</Checkbox>) : null
            }
            已加载全部设备，共{this.state.deviceNum}个
          </div>
          {
            this.state.switchPage ? (<DeviceCard DeviceMsg={this.state.DeviceMsg} selectDeviceId={this.state.selectDeviceId} clickDeviceCard={this.clickDeviceCard} refreshdeviceFunc={this.refreshdevice} refreshdeviceData={this.state.refreshdeviceData} />) : (<DeviceTable DeviceMsg={this.state.DeviceMsg} refreshdeviceData={this.state.refreshdeviceData} refreshdeviceFunc={this.refreshdevice} />)
          }
        </div>
      </div>
    );
  }
}

export default DeviceManage;