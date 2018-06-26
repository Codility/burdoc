import { blue600, grey100, red900 } from 'constants/colors';
import { borderRadius } from 'constants/styles';

export default function BaseStyles() {
  return (
    <style jsx global>{`
      *, *:before, *:after {
        box-sizing: border-box;
      }

      html {
        font-size: 16px;
      }

      body {
        margin: 0;
      }

      a {
        color: ${blue600};
        text-decoration: none;
      }

      b { font-weight: 700 }

      code {
        background-color: ${grey100};
        border-radius: ${borderRadius};
        color: ${red900};
        font-size: 0.875em;
        padding: 2px 8px;
      }

      h1 {
        font-size: 40px;
        font-weight: 300;
      }

      h2 {
        font-size: 30px;
        font-weight: 300;
      }

      h3 {
        font-size: 22px;
        font-weight: 400;
      }

      h1, h2, h3 {
        margin: 1.75em 0 1em;
      }

      iframe {
        border: none;
      }

      li {
        margin: 16px 0;
      }

      button, input, optgroup, select, textarea {
        color: inherit;
        font: inherit;
        margin: 0;
      }

      /**
       * Based on the GitHub theme
       */

      .cm-s-default .cm-atom { color: #0086b3; }
      .cm-s-default .cm-attribute { color: #63a35c; }
      .cm-s-default .cm-comment { color: #969896; }
      .cm-s-default .cm-keyword { color: #a71d5d; }
      .cm-s-default .cm-number { color: #0086b3; }
      .cm-s-default .cm-operator { color: #a71d5d; }
      .cm-s-default .cm-property { color: #795da3; }
      .cm-s-default .cm-string { color: #183691; }
      .cm-s-default .cm-tag { color: #0086b3; }
      .cm-s-default .cm-tag.cm-bracket { color: inherit; }
      .cm-s-default .cm-variable { color: #795da3; }
    `}</style>
  );
}
