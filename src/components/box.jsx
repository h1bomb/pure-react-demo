import React from 'react';
import { DropTarget } from 'react-dnd';
import Card from './card';

const Types = {
  CARD: 'card',
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType(),
  };
}

const spec = {
  canDrop() {
    // You can disallow drop based on props or item
    // const item = monitor.getItem();
    // console.log(item);
    return true;
  },

  hover() {
    // const clientOffset = monitor.getClientOffset();
    // // const componentRect = findDOMNode(component).getBoundingClientRect();

    // // You can check whether we're over a nested drop target
    // const isJustOverThisOne = monitor.isOver({ shallow: true });

    // // You will receive hover() even for items for which canDrop() is false
    // const canDrop = monitor.canDrop();
    // console.log(clientOffset, isJustOverThisOne, canDrop);
  },

  drop() {

  },
};

const Box = ({ isOver, canDrop, connectDropTarget }) => {
  let color = '#ccc';
  if (isOver && canDrop) {
    color = 'green';
  } else if (!isOver && canDrop) {
    color = 'yellow';
  } else if (isOver && !canDrop) {
    color = 'red';
  }
  return connectDropTarget(
    <div style={{ width: 100, height: 200, backgroundColor: color }}>
      <Card>
        <Card />
      </Card>
    </div>,
  );
};

export default DropTarget(Types.CARD, spec, collect)(Box);
