import PropTypes from 'prop-types';
import { Fragment } from 'react';

import { lightBlue400, yellow700 } from 'constants/colors';
import Badge from 'core/Badge';
import Markdown from 'core/Markdown';

function Default({ children }) {
  if (!children) {
    return null;
  }

  return (
    <Fragment>
      {' '}
      (default: <code>{children}</code>)
    </Fragment>
  );
}

Default.propTypes = {
  children: PropTypes.string,
};

export default function Prop({
  args ,
  children,
  description,
  defaultValue,
  isA11y,
  isFunction,
  isRequired,
  name,
}) {
  const formattedDescription = description ? <Markdown isInline>{description}</Markdown> : children;

  return (
    <li>
      <code>
        {name}
        {isFunction && `(${args})`}
      </code>

      <Default>{defaultValue}</Default>

      {isRequired && (
        <Badge color={yellow700}>
          required
        </Badge>
      )}

      {isA11y && (
        <Badge color={lightBlue400}>
          a11y
        </Badge>
      )}

      {formattedDescription && <Fragment>: {formattedDescription}</Fragment>}
    </li>
  );
}

Prop.propTypes = {
  args: PropTypes.string,
  children: PropTypes.node,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  isA11y: PropTypes.bool,
  isFunction: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
};
