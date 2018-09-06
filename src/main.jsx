import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Spin, Layout, Switch as SwitchUI } from 'antd';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import loadComponent from './components/LoadComponent';
import Dnd from './containers/dnd';
import Move from './components/move';
import Keyframe from './components/keyframe';

const { Content } = Layout;
const Loading = () => (
  <Spin />
);
const Big = () => (
  <div>
big
  </div>
);
const WithBig = loadComponent(Big);
const B = () => (<WithBig loading />);

const Home = Loadable({
  loader: () => import('./containers/app'),
  loading: Loading,
});

const About = Loadable({
  loader: () => import('./components/about'),
  loading: Loading,
});

const colorList = {
  main: '#1890ff',
  second: '#00e9be',
};

function onChange(checked) {
  let color = colorList.second;
  if (checked) {
    color = colorList.main;
  }
  less.modifyVars({
    '@primary-color': color,
  });
}

const Main = () => (
  <Content style={{ padding: '50px' }}>
    <SwitchUI defaultChecked onChange={onChange} />
    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
      <DragDropContextProvider backend={HTML5Backend}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/with" component={B} />
            <Route path="/dnd" component={Dnd} />
            <Route path="/move" component={Move} />
            <Route path="/keyframe" component={Keyframe} />
          </Switch>
        </Router>
      </DragDropContextProvider>
    </div>
  </Content>

);

export default Main;
