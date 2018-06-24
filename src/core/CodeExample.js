import { stripIndent } from 'common-tags';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

import { grey300 } from 'constants/colors';
import Code from 'core/Code';

function normalizeSize(size) {
  return typeof size === 'number' ? `${size}px` : size;
}

export default function CodeExample({ backgroundColor = 'initial', children, code, height = 'auto', imports, width = 'auto' }) {
  if (typeof children === 'string') {
    return (
      <Code imports={imports}>{stripIndent([children])}</Code>
    );
  }

  return (
    <Fragment>
      <div className="viewport-wrapper">
        <div className="viewport" style={{ height: normalizeSize(height), width: normalizeSize(width) }}>
          {children}
        </div>
      </div>

      <Code imports={imports}>{code}</Code>

      <style jsx>{`
        .viewport-wrapper {
          background-color: ${backgroundColor};
          border: 1px solid ${grey300};
          margin-bottom: -1px;
          overflow: hidden;
          padding: 16px;
        }

        .viewport {
          overflow: auto;
          position: relative;
        }
      `}</style>
    </Fragment>
  );
}

CodeExample.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  code: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imports: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
