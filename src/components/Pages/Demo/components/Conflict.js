import React from 'react';
import _ from 'lodash';

import ItemNameInput from './ItemNameInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Conflict extends React.Component {
  constructor(props) {
    super(props)
    this.getTop = this.getTop.bind(this)
    this.state = {
      isEditing: false
    }
  }

  componentDidMount() {
    const height = this.refs.conflict.getBoundingClientRect().height;
    this.props.setItemHeight(this.props._id, height);
  }

  getTop() {
    const { meta, _id, index, height, isCompleted } = this.props
    const prevHeight = _.sumBy(meta.conflicts.slice(0, index), 'height'),
      top = prevHeight

    return top
  }

  render() {
    const { name, _id, height, index, handlePickWinnerClick } = this.props;
    const { isCompleted, hasConflict, conflictVersions } = this.props;
    const { isEditing } = this.state;

    let classes = isCompleted ? "conflict completed" : "conflict";
    let top = this.getTop();

    const conflictName = (
      <div className="conflict-name">
        <h1>{name}</h1>
      </div>
    )

    return (
      <div
        _id={`conflict-${_id}`}
        data-height={height}
        data-top={top}
        ref="conflict"
        className={classes}
        style={{ top: `${top}px` }}
      >
        <div className="conflict-icon">
          <FontAwesomeIcon icon={['far', 'circle']} className="uncompleted" />
          <FontAwesomeIcon icon="check" className="completed" />
        </div>
        {conflictName}
        <div className="conflict-pick" onClick={handlePickWinnerClick}>
          Pick
        </div>
      </div>
    )
  }
}

export default Conflict;
