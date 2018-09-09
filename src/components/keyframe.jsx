import './style.css';
import React, { Fragment } from 'react';
import {
  Keyframes, animated, config, Spring,
} from 'react-spring';
import { Button } from 'antd';
import delay from 'delay';

const ButtonGroup = Button.Group;

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
  state = {
    open: undefined, fromOp: 0, toOp: 1, x: 0, y: 0, toX: 80, toY: 100,
  }

  setkey = (action) => {
    this.setState({ open: action });
  }

  toggleMove = () => {
    const {
      x, y,
    } = this.state;
    if (x === 0 && y === 0) {
      this.setState({
        x: 80,
        y: 100,
        toX: 0,
        toY: 0,
      });
    } else {
      this.setState({
        x: 0,
        y: 0,
        toX: 100,
        toY: 80,
      });
    }
  }

  render() {
    const {
      open, fromOp, toOp, fromX, fromY, toX, toY,
    } = this.state;
    let state;
    if (open === undefined) {
      state = 'peek';
    } else if (open) {
      state = 'open';
    } else {
      state = 'close';
    }
    const isShow = fromOp === 0 ? 'Hide' : 'Show';
    const isPrimary = s => (s === state ? 'primary' : '');
    const toggle = () => {
      if (fromOp === 0) {
        this.setState({
          fromOp: 1,
          toOp: 0,
        });
      } else {
        this.setState({
          fromOp: 0,
          toOp: 1,
        });
      }
    };
    return (
      <Fragment>
        <Button onClick={toggle}>
          {isShow}
        </Button>
        <Button onClick={this.toggleMove}>
           set
        </Button>
        <br />
        <ButtonGroup>
          <Button type={isPrimary('peek')} onClick={() => { this.setkey(); }}>
peek
          </Button>
          <Button type={isPrimary('open')} onClick={() => { this.setkey(true); }}>
open
          </Button>
          <Button type={isPrimary('close')} onClick={() => { this.setkey(false); }}>
close
          </Button>
        </ButtonGroup>
        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div className="sidebar" style={{ transform: x.interpolate(xx => `translate3d(${xx}%,0,0)`) }} />
          )}
        </Sidebar>
        <Spring from={{ opacity: fromOp }} to={{ opacity: toOp }}>
          {styles => (
            <div style={styles}>
             i will fade in
            </div>
          )}
        </Spring>
        <Spring
          from={{ fromX, fromY }}
          to={{ x: toX, y: toY }}
        >
          {styles => (
            <div style={{ width: '300px', backgroundColor: '#ccc', transform: `translate3d(${styles.x}px,${styles.y}px,0)` }}>
             啦啦啦
            </div>
          )}
        </Spring>
      </Fragment>
    );
  }
}

export default App;
