import PropTypes from 'prop-types';
import { Component } from 'react';

export default class Interval extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    timeout: PropTypes.number,
  };

  static defaultProps = {
    timeout: 2000,
  };

  state = {
    data: this.props.getData(true),
  };

  componentDidMount() {
    this.interval = setInterval(() => this.updateData(), this.props.timeout);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return this.props.children(this.state.data);
  }

  updateData() {
    this.setState({ data: this.props.getData() });
  }
}
