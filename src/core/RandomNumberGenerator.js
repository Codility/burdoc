import PropTypes from 'prop-types';
import { Component } from 'react';

import Interval from 'core/Interval';

export default class RandomNumberGenerator extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    timeout: PropTypes.number,
  };

  render() {
    return (
      <Interval getData={this.nextNumber} timeout={this.props.timeout}>
        {this.props.children}
      </Interval>
    );
  }

  nextNumber = isFirst => {
    const { min, max } = this.props;
    if (isFirst) {
      // First render with min so that SSR works properly
      return min;
    }
    return Math.random() * (max - min) + min;
  };
}
