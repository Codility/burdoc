import { mapValues, omit } from 'lodash';
import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Toggler extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    initialValue: PropTypes.object,
  };

  getInitialState() {
    let initialValue = this.props.initialValue;

    const handlerDeclarations = omit(this.props, 'children', 'initialValue');
    const handlers = mapValues(handlerDeclarations, valuesOrValue => {
      const values = Array.isArray(valuesOrValue) ? valuesOrValue : [valuesOrValue];
      if (typeof initialValue === 'undefined') {
        initialValue = values[0];
      }

      return () => {
        this.setState(({ value }) => {
          const currentIndex = values.indexOf(value);
          const nextValue = values[(currentIndex + 1) % values.length];
          return { value: nextValue };
        });
      };
    });

    return {
      ...handlers,
      value: initialValue,
    };
  }

  state = this.getInitialState();

  render() {
    return this.props.children(this.state);
  }
}
