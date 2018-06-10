'use strict';

const babelPluginSyntaxJSX = require('babel-plugin-syntax-jsx');
const { stripIndent } = require('common-tags');

const tagName = 'CodeExample';
const receiverPropName = 'code';

module.exports = function({ types }) {
  const visitor = {
    JSXElement(path, state) {
      if (
        !types.isJSXIdentifier(path.node.openingElement.name, {
          name: tagName,
        }) ||
        !types.isJSXClosingElement(path.node.closingElement)
      ) {
        return;
      }

      const fileCode = state.file.code;
      const start = path.node.openingElement.end;
      const end = path.node.closingElement.start;

      const rawCode = fileCode.slice(start, end);
      const code = stripIndent([rawCode]);

      const attribute = types.JSXAttribute(
        types.JSXIdentifier(receiverPropName),
        types.JSXExpressionContainer(types.StringLiteral(code)),
      );

      path.get('openingElement').pushContainer('attributes', attribute);
    },
  };

  return {
    inherits: babelPluginSyntaxJSX,
    visitor,
  };
};
