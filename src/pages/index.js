import Head from 'next/head';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

import BaseStyles from 'mainPage/BaseStyles';
import Menu from 'mainPage/Menu';
import sections from 'sections';
import NotFound from 'NotFound';

export default function Index({ pathname }) {
  const activeSection = sections.find(doc => doc.pathname === pathname);
  return (
    <div className="wrapper">
      <BaseStyles />

      <Head>
        <title>Pattern Library - Codility</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#F4AC3B" />
        <meta name="theme-color" content="#F4AC3B" />
        <link rel="stylesheet" href="/static/editor-theme.css" />
      </Head>

      <div className="menu-column">
        <Menu sections={sections} />
      </div>

      <div className="container-column">
        {activeSection ? (
          <Fragment>
            <h1>{activeSection.name}</h1>
            <activeSection.Section />
          </Fragment>
        ) : (
          <NotFound />
        )}
      </div>

      <style jsx>{`
        .wrapper { display: flex }

        .menu-column { flex: 0 0 auto }

        .container-column {
          flex: 1 1 0px;
          margin: 64px 48px;
          min-width: 0;
        }

        h1 { margin-top: 0 }
      `}</style>
    </div>
  );
}

Index.propTypes = {
  pathname: PropTypes.string.isRequired,
};

Index.getInitialProps = ({ query }) => {
  return { pathname: query.pathname || '/' };
};
