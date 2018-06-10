import update from 'immutability-helper';
import { get, mapValues, omit } from 'lodash';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Setter extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    initialState: PropTypes.object,
  };

  getInitialState() {
    const handlers = omit(this.props, 'children', 'initialState');
    return {
      ...mapValues(handlers, name => value => {
        this.setState(state =>
          update(state, {
            state: {
              [name]: { $set: value },
            },
          }),
        );
      }),
      state: get(this.props, 'initialState', {}),
    };
  }

  state = this.getInitialState();

  render() {
    return this.props.children(this.state);
  }
}
