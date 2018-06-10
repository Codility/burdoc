import Document, { Head, Main, NextScript } from 'next/document';
import { Fragment } from 'react';
import { ServerStyleSheet } from 'styled-components';
import flush from 'styled-jsx/server';

export default class extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
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
}
