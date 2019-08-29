import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import Content from './views/Content/Content';
import Login from './views/Login/Login';
import Error from './views/Error/Error';
import DeviceManage from './views/DeviceManage/DeviceManage';

// 按路由拆分代码(跳转期间会显示设定的组件，跳转成功后设定的组件消失)
// import Loadable from 'react-loadable';

// const loadingComponent = ({ isLoading, error }) => {
//   // Handle the loading state
//   if (isLoading) {
//       return <div style={{background:'rgba(222, 235, 254, 1)',width:'100vw',height: '100vh'}}>Loading</div>;
//   }
//   // Handle the error state
//   else if (error) {
//       return <div>Sorry, there was a problem loading the page.</div>;
//   }
//   else {
//       return null;
//   }
// };

// const Error = Loadable({
//   loader: () => import('./views/Error/Error'),
//   loading: loadingComponent
// });

// const Home= Loadable({
//   loader: () => import('./views/Home/Home'),
//   loading: loadingComponent
// });

// const Login= Loadable({
//   loader: () => import('./views//Login/Login'),
//   loading: loadingComponent
// });

// 登录验证
function requireAuth(Layout, props) {
  const token = JSON.parse(sessionStorage.getItem("token"));
  // console.log(token)
  if (token === null || token === '' || token.token === null || token.token === '') { // 未登录
    return <Redirect to="/" />;
  } else {
    return <Layout {...props} />
  }
}

const BasicRoute = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={props => requireAuth(Home, props)} />
        <Route exact path="/deviceManage" component={props => requireAuth(DeviceManage, props)} />
        <Route exact path="/content" component={props => requireAuth(Content, props)} />
        <Route exact path="/error" component={Error} />
        <Redirect from="/redirect" to="/home" />
        <Route component={Error} />
      </Switch>
    </Router>
  </Provider>
);
// const BasicRoute = () => (
//   <Provider store={store}>
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Login} />
//         <Route exact path="/home" component={Home} />
//         <Route exact path="/content" component={Content} />
//         <Route exact path="/error" component={Error} />
//         <Redirect from="/redirect" to="/home" />
//         <Route component={Error} />
//       </Switch>
//     </Router>
//   </Provider>
// );

export default BasicRoute;