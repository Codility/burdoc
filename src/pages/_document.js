import Document, { Head, Main, NextScript } from 'next/document';
import { Fragment } from 'react';
import flush from 'styled-jsx/server';

function getStyledComponents() {
  try {
    const { ServerStyleSheet } = __non_webpack_require__('styled-components');
    return { ServerStyleSheet };
  } catch (error) {
    return null;
  }
}

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const styledComponents = getStyledComponents();
    if (styledComponents !== null) {
      const sheet = new styledComponents.ServerStyleSheet();
      const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
      const jsxStyles = flush();
      const styledStyles = sheet.getStyleElement();
      const styles = (
        <Fragment>
          {jsxStyles}
          {styledStyles}
        </Fragment>
      );
      return { ...page, styles };
    }

    const page = renderPage();
    const styles = flush();
    return { ...page, styles };
  }
}
