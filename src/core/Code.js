import PropTypes from 'prop-types';

import { grey100, grey300, grey900 } from 'constants/colors';
import highlight from 'core/highlight';

function getCode(imports, code) {
  return imports ? `${imports}\n\n${code}` : code;
}

export default function Code({ children, imports, value }) {
  return (
    <pre>
      {highlight(getCode(imports, value || children || ''))}

      <style jsx>{`
        pre {
          background-color: ${grey100};
          border: 1px solid ${grey300};
          color: ${grey900};
          display: block;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          margin-top: 0;
          padding: 1rem;
        }
      `}</style>
    </pre>
  );
}

Code.propTypes = {
  children: PropTypes.string,
  imports: PropTypes.string,
  value: PropTypes.string,
};
