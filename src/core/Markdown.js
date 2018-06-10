import { stripIndent } from 'common-tags';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import Code from 'core/Code';

const renderers = {
  code: Code,
};

const inlineRenderers = {
  paragraph: 'span',
  root: 'span',
};

export default function Markdown({ children, isInline }) {
  const source = stripIndent(children);
  return (
    <ReactMarkdown source={source} renderers={isInline ? inlineRenderers : renderers} />
  );
}

Markdown.propTypes = {
  children: PropTypes.string,
  isInline: PropTypes.bool,
};

Markdown.defaultProps = {
  children: '',
  isInline: false,
};
