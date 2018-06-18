import PropTypes from 'prop-types';

import { white } from 'constants/colors';
import { borderRadius } from 'constants/styles';

export default function Badge({ children, color }) {
  return (
    <span style={{ backgroundColor: color }}>
      {children}

      <style jsx>{`
        border-radius: ${borderRadius};
        color: ${white};
        display: inline-block;
        font-size: 0.875em;
        line-height: 1;
        margin-left: 0.5em;
        padding: 0.2em 0.4em;
        text-align: center;
        white-space: nowrap;
      `}</style>
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};
