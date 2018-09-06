import React from 'react';
import {
  Trail, animated, interpolate, Transition, Keyframes, config,
} from 'react-spring';
import './move.css';
import delay from 'delay';


const ToLists = ({ lists }) => (
  <div>
    {lists.map((list, key) => (
      <div
        className="cards-list"
        key={key} // eslint-disable-line
      >
        { list.map((val, k) => (
          <div key={val} style={{ zIndex: list.length - k }} className="card">
            {val}
          </div>
        ))}
      </div>
    ))}
  </div>
);
const FromBox = ({ activeItems, items, go }) => {
  let move = null;
  if (activeItems.length > 0) {
    move = (
      <Trail
        native
        from={{ x: 0, y: 0 }}
        to={{ x: 80, y: 100 }}
        keys={activeItems}
      >
        {activeItems.map((val, key) => ({ x, y }) => (
          <animated.div
            key={val}
            className="card"
            onClick={() => {
              go();
            }}
            style={{
              zIndex: 100,
              transform: interpolate([x, y], (mx, my) => `translate3d(${(mx * key)}px,${my}px,0)`),
            }}
          >
            {val}
          </animated.div>
        ))}
      </Trail>
    );
  }

  return (
    <div style={{ position: 'absolute' }}>
      {move}
      {items.map((val, k) => (
        <div
          key={val}
          onClick={() => {
            go();
          }}
          style={{ zIndex: items.length - k }}
          className="card"
        >
          {val}
        </div>
      ))}
    </div>
  );
};
const Container = Keyframes.Spring({
  // Single props
  show: { to: { opacity: 1 } },
  // Chained animations (arrays)
  showAndHide: [{ to: { opacity: 1 } }, { to: { opacity: 0 } }],
  // Functions with side-effects
  wiggle: async (call) => {
    await call({ to: { x: 100 }, config: config.wobbly });
    await delay(1000);
    await call({ to: { x: 0 }, config: config.gentle });
  },
});
class Move extends React.PureComponent {
  state = {
    keyframe: 'show', activeItems: [], lists: [[], []], items: ['item1', 'item2', 'item3', 'item4', 'item5'],
  }

  setKey = () => {
    this.setState({
      keyframe: 'showAndHide',
    });
  }

  go = () => {
    const { items, lists } = this.state;
    const newActiveItems = items.length <= 2 ? [...items] : [...items.slice(0, 2)];
    const newItems = items.length <= 2 ? [] : items.slice(2, items.length);
    const newLists = [];
    newLists.push([newActiveItems[0], ...lists[0]]);
    if (newActiveItems[1]) {
      newLists.push([newActiveItems[1], ...lists[1]]);
    } else {
      newLists.push([...lists[1]]);
    }
    this.setState({
      activeItems: newActiveItems,
      items: newItems,
    });

    setTimeout(() => {
      this.setState({
        activeItems: [],
        lists: newLists,
      });
    }, 1000);
  }

  render() {
    const {
      activeItems, items, lists, keyframe,
    } = this.state;
    return (
      <div>
        <button type="button" onClick={this.setKey}>
click
        </button>
        <ToLists lists={lists} />
        <FromBox activeItems={activeItems} items={items} go={this.go} />
        <ul>
          <Transition
            keys={items.map(item => item.key + Math.random())}
            from={{ opacity: 0, height: 0 }}
            enter={{ opacity: 1, height: 20 }}
            leave={{ opacity: 0, height: 0, pointerEvents: 'none' }}
          >
            {items.map(item => styles => (
              <li style={styles}>
                {item}
              </li>
            ))}
          </Transition>
        </ul>
        <Container state={keyframe}>
          {styles => (
            <div className="hello" style={styles}>
Hello
            </div>
          )}
        </Container>
      </div>
    );
  }
}


export default Move;
