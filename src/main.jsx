import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Spin, Layout } from 'antd';

const { Content } = Layout;
const Loading = () => (
  <Spin />
);

const Home = Loadable({
  loader: () => import('./containers/app'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import('./components/about'),
  loading: Loading,
});

const Main = () => (
  <Content style={{ padding: '50px' }}>
    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  </Content>

);

export default Main;
