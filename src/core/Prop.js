import PropTypes from 'prop-types';

import Badge from 'core/Badge';
import Markdown from 'core/Markdown';

function Default({ value }) {
  if (!value) {
    return <span />;
  }

  return (
    <span>
      {' '}
      (default: <code>{value}</code>)
    </span>
  );
}

Default.propTypes = {
  value: PropTypes.string.isRequired,
};

const functionName = /^on[A-Z]/;

export default function Prop({
  args,
  children,
  description,
  defaultValue,
  isA11y,
  isRequired,
  name,
}) {
  const formattedDescription = description ? <Markdown isInline>{description}</Markdown> : children;
  const hasArgs = functionName.test(name);

  return (
    <li>
      <code>
        {name}
        {hasArgs && `(${args})`}
      </code>
      <Default value={defaultValue} />

      {isRequired && (
        <Badge type="warning" isInline>
          required
        </Badge>
      )}

      {isA11y && (
        <Badge type="info" isInline>
          a11y
        </Badge>
      )}

      {formattedDescription && <span>: {formattedDescription}</span>}
    </li>
  );
}

Prop.propTypes = {
  args: PropTypes.string,
  children: PropTypes.node,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  isA11y: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

Prop.defaultProps = {
  args: '',
  defaultValue: '',
  isA11y: false,
  isRequired: false,
};
