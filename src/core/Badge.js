import PropTypes from 'prop-types';

import {
  blue600,
  green500,
  grey500,
  lightBlue400,
  red600,
  white,
  yellow700,
} from 'constants/colors';
import { borderRadius } from 'constants/styles';

const backgroundColorFromType = {
  default: grey500,
  primary: blue600,
  success: green500,
  info: lightBlue400,
  warning: yellow700,
  danger: red600,
};

export default function Badge({ children, isInline, type }) {
  return (
    <span style={{ backgroundColor: backgroundColorFromType[type] }}>
      {children}

      <style jsx>{`
        border-radius: ${borderRadius};
        color: ${white};
        display: inline-block;
        font-size: ${isInline ? '0.875rem' : '1rem'};
        line-height: 1;
        margin-left: ${isInline ? '0.5em' : '1em'};
        padding: 0.2em 0.4em;
        text-align: center;
        vertical-align: ${isInline ? 'baseline' : 'middle'};
        white-space: nowrap;
      `}</style>
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  isInline: PropTypes.bool,
  type: PropTypes.oneOf(Object.keys(backgroundColorFromType)).isRequired,
};

Badge.defaultProps = {
  isInline: false,
};
