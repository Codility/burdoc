import { stripIndent } from 'common-tags';
import PropTypes from 'prop-types';

import { grey300 } from 'constants/colors';
import Code from 'core/Code';

function normalizeSize(size) {
  return typeof size === 'number' ? `${size}px` : size;
}

export default function CodeExample({ backgroundColor, children, code, height, imports, width }) {
  if (typeof children === 'string') {
    return (
      <div>
        <Code imports={imports}>{stripIndent([children])}</Code>
      </div>
    );
  }

  return (
    <div>
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
          padding: 1rem;
        }

        .viewport { position: relative }
      `}</style>
    </div>
  );
}

CodeExample.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  code: PropTypes.string,
  codeOnly: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  imports: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

CodeExample.defaultProps = {
  backgroundColor: 'initial',
  code: '',
  codeOnly: false,
  height: 'auto',
  imports: '',
  width: 'auto',
};
