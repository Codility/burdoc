/**
 * Reference file: https://github.com/codemirror/CodeMirror/blob/master/bin/source-highlight
 */

import CodeMirror from 'codemirror/addon/runmode/runmode.node';
import 'codemirror/mode/jsx/jsx';

const whitespaceRegExp = /\s+/g;

function styleToClassName(style) {
  return style
    .split(whitespaceRegExp)
    .map(part => `cm-${part}`)
    .join(' ');
}

export default function highlight(code) {
  const children = [];
  let style = null;
  let acc = '';

  function flush() {
    if (style) {
      children.push(<span key={children.length} className={styleToClassName(style)}>{acc}</span>);
    } else if (acc) {
      children.push(<span key={children.length}>{acc}</span>);
    }
  }

  CodeMirror.runMode(code, 'text/jsx', (text, nextStyle) => {
    if (nextStyle !== style) {
      flush();
      style = nextStyle;
      acc = text;
    } else {
      acc += text;
    }
  });
  flush();

  return <span className="cm-s-default">{children}</span>;
}
