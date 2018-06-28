import Head from 'next/head';
import PropTypes from 'prop-types';
import { Fragment } from 'react';

import BaseStyles from 'mainPage/BaseStyles';
import Menu from 'mainPage/Menu';
import sections, { defaultSectionConfig } from 'sections';
import NotFound from 'NotFound';

export default function Index({ pathname }) {
  const activeSection = sections.find(doc => doc.pathname === pathname) || defaultSectionConfig;
  return (
    <div className="wrapper">
      <BaseStyles />
      {activeSection.styles}

      <Head>
        <title>{activeSection.title}</title>
        {activeSection.head}
      </Head>

      <div className="menu-column">
        <Menu sections={sections} />
      </div>

      <div className="container-column">
        {activeSection.Section ? (
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
