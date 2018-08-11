import React from 'react';
import { DragSource } from 'react-dnd';

// Drag sources and drop targets only interact
// if they have the same string type.
// You want to keep types in a separate file with
// the rest of your app's constants.
const Types = {
  CARD: 'card',
};

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  beginDrag(props) {
    const { id } = props;
    // Return the data describing the dragged item
    const item = { id };
    return item;
  },

  endDrag() {
    // if (!monitor.didDrop()) {

    // }

    // When dropped on a compatible target, do something
    // const item = monitor.getItem();
    // const dropResult = monitor.getDropResult();
    // console.log(item, dropResult);
    // CardActions.moveCardToList(item.id, dropResult.listId);
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging(),
  };
}

class Card extends React.Component {
  render() {
    // Your component receives its own props as usual
    // These two props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource, children } = this.props;

    return connectDragSource(
      <div style={{ width: 100, height: 100, backgroundColor: isDragging ? '#fff' : 'blue' }}>
        {children}
      </div>,
    );
  }
}

// Export the wrapped version
export default DragSource(Types.CARD, cardSource, collect)(Card);
