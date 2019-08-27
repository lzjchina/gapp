import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Avatar, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './Nav.less';

const { SubMenu } = Menu;

function mapStateToProps(state) {
  return {
    loginData: state.login.data
  };
}


class Nav extends Component {

  constructor() {
    super();
    this.state = {
      current: 'mail',
      user_name: '',
      tokenMsg: '',
      pathname: null,
      urlArr: [
        {
          id: 1,
          path: '/',
          name: '设备管理',
          children: [
            {
              id: 11,
              path: '/',
              name: '设备管理'
            },
            {
              id: 12,
              path: '/',
              name: '下载进度'
            }
          ]
        },
        {
          id: 2,
          path: '/home',
          name: '屏幕分组'
        },
        {
          id: 3,
          path: '/content',
          name: '节目编辑'
        },
        {
          id: 4,
          path: '/',
          name: '播放计划'
        },
        {
          id: 5,
          path: '/',
          name: '信息发布'
        },
        {
          id: 6,
          path: '/',
          name: '设备监控'
        },
        {
          id: 7,
          path: '/',
          name: '数据统计',
          children: [
            {
              id: 71,
              path: '/error',
              name: '播放器数据'
            },
            {
              id: 72,
              path: '/',
              name: 'AI数据'
            },
            {
              id: 73,
              path: '/',
              name: 'RTU数据'
            }
          ]
        },
        {
          id: 8,
          path: '/',
          name: 'AI'
        }
      ]
    };
  }
  componentDidMount() {
    this.getUserName();
    this.getTokenMsg();
    this.getLocalUrl();
    this.placePath();
  }
  componentDidUpdate() {
    // console.log(this.state.urlArr)
    // console.log(this.state.tokenMsg)
  }
  getTokenMsg() {
    this.setState({
      tokenMsg: JSON.parse(sessionStorage.getItem("token"))
    });
  }
  getUserName() {
    this.setState({
      user_name: JSON.parse(sessionStorage.getItem('token')).nickname
    });
  }
  // 获取当前url，将对应的导航加上active状态
  getLocalUrl() {
    this.setState({
      pathname: this.props.location.pathname
    });

  }
  // 有children的nav，将父的路径替换成当前的pathurl
  placePath() {
    const temp = this.state.urlArr.map(items => {
      if ('children' in items) {
        items.children.forEach((eles) => {
          if (this.props.location.pathname === eles.path) {
            items.path = this.props.location.pathname;
          }
        });
      }
      return items
    });
    this.setState({
      urlArr: temp
    });
  }
  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };
  render() {
    let menuItems = null;
    if (this.state.tokenMsg.mtype === '1') {
      menuItems = <Menu.Item>
        <Link to="/">后台</Link>
      </Menu.Item>
    }
    const menu = (
      <Menu>
        {menuItems}
        <Menu.Item>
          <Link to="/">退出</Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="Nav_box">
        <div className="Nav_left">
          <Link to="/" className="logo"></Link >
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            {
              this.state.urlArr.map((items) => {
                if ('children' in items) {
                  return (<SubMenu key={items.id} className={this.state.pathname === items.path ? 'ant-menu-item-selected' : null} title={
                    <span className="submenu-title-wrapper">
                      {items.name}
                    </span>
                  }>
                    {
                      items.children.map((eles) => <Menu.Item key={eles.id}><Link to={eles.path}>{eles.name}</Link></Menu.Item>)
                    }
                  </SubMenu>)
                } else {
                  return <Menu.Item className={this.state.pathname === items.path ? 'ant-menu-item-selected' : null} key={items.id}><Link to={items.path}>{items.name}</Link></Menu.Item>;
                }
              })
            }
          </Menu>
        </div>
        <div className="Avatar_box">
          <Dropdown overlay={menu}>
            <div className="ant-dropdown-link">
              <Avatar icon="user" />
              <span>{this.state.user_name}</span>
            </div>
          </Dropdown>
        </div>
      </div>

    );
  }
}

export default withRouter(connect(mapStateToProps)(Nav));