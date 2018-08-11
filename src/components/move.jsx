import React from 'react';
import { Trail, animated, interpolate } from 'react-spring';
import './move.css';

const ToLists = ({ lists }) => (
  <div>
    {lists.map((list, key) => (
      <div
        className="cards-list"
        key={key} // eslint-disable-line
      >
        { list.map(val => (
          <div key={val} className="card">
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
        to={{ x: 100, y: 100 }}
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
      {items.map(val => (
        <div
          key={val}
          onClick={() => {
            go();
          }}
          className="card"
        >
          {val}
        </div>
      ))}
    </div>
  );
};
class Move extends React.PureComponent {
  state = { activeItems: [], lists: [[], []], items: ['item1', 'item2', 'item3', 'item4', 'item5'] }

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
      lists: newLists,
    });
  }

  render() {
    const { activeItems, items, lists } = this.state;
    return (
      <div>
        <ToLists lists={lists} />
        <FromBox activeItems={activeItems} items={items} go={this.go} />
      </div>
    );
  }
}


export default Move;
