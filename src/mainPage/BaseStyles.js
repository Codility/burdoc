import Head from 'next/head';
import { Fragment } from 'react';
import css from 'styled-jsx/css';

import { blue600, grey100, red900 } from 'constants/colors';
import { borderRadius } from 'constants/styles';

export default function BaseStyles() {
  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,700" />
      </Head>

      <style jsx global>{`
        html {
          font-family: Roboto, sans-serif;
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
          padding: 0.15rem 0.4rem;
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
          margin: 1.125em 0 0.875em;
        }

        li {
          margin: 0.625rem 0;
        }
      `}</style>
    </Fragment>
  );
}
