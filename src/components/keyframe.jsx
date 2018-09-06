import './style.css';
import React, { Fragment } from 'react';
import { Keyframes, animated, config } from 'react-spring';
import { Icon } from 'antd';
import delay from 'delay';

const fast = { ...config.stiff, restSpeedThreshold: 1, restDisplacementThreshold: 0.01 };

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  peek: [
    {
      delay: 500, from: { x: -100 }, to: { x: 0 }, config: fast,
    },
    { delay: 800, to: { x: -100 }, config: config.slow },
  ],
  // single items,
  open: { to: { x: 0 }, config: config.default },
  // or async functions with side-effects
  close: async (call) => {
    await delay(400);
    await call({ to: { x: -100 }, config: config.gentle });
  },
});


class App extends React.Component {
  state = { open: undefined }

  toggle = () => this.setState(state => ({ open: !state.open }))

  render() {
    const { open } = this.state;
    let state;
    if (open === undefined) {
      state = 'peek';
    } else if (open) {
      state = 'open';
    } else {
      state = 'close';
    }
    const icon = open ? 'fold' : 'unfold';
    return (
      <Fragment>
        <Icon type={`menu-${icon}`} className="toggle" onClick={this.toggle} />
        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div className="sidebar" style={{ transform: x.interpolate(xx => `translate3d(${xx}%,0,0)`) }} />
          )}
        </Sidebar>
      </Fragment>
    );
  }
}

export default App;
