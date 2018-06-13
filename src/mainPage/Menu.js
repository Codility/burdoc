import { groupBy } from 'lodash';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';

import { grey50, grey300 } from 'constants/colors';

const menuWidth = '240px';

export default class Menu extends Component {
  static propTypes = {
    sections: PropTypes.array.isRequired,
  };

  state = {
    filter: '',
  };

  render() {
    const sectionsByCategories = groupBy(this.props.sections, section => section.category);
    return (
      <div className="wrapper">
        <div className="inner-wrapper">
          <input onChange={this.updateFilter} placeholder="Type to filter" />
          <ul>
            {Object.entries(sectionsByCategories).map(([category, sections]) => (
              <Fragment key={category}>
                {category && (
                  <li>
                    <h1>{category}</h1>
                  </li>
                )}
                {sections.map(({ name, pathname }) => {
                  const filteredName = this.getFilteredName(name);
                  if (!filteredName) {
                    return null;
                  }
                  const href = { pathname: '/', query: { pathname } };
                  return (
                    <li key={pathname}>
                      <Link href={href} as={pathname}>
                        <a>{filteredName}</a>
                      </Link>
                    </li>
                  );
                })}
              </Fragment>
            ))}
          </ul>
        </div>

        <style jsx>{`
          .wrapper { width: ${menuWidth} }

          .inner-wrapper {
            background-color: ${grey50};
            box-sizing: border-box;
            height: 100%;
            left: 0;
            overflow-y: auto;
            padding: 16px 16px 48px;
            position: fixed;
            top: 0;
            width: ${menuWidth};
          }

          input {
            border: 1px solid ${grey300};
            box-sizing: border-box;
            font-size: 14px;
            height: 24px;
            line-height: 24px;
            margin-bottom: 24px;
            padding: 0 4px;
            width: 100%;
          }

          h1 {
            font-size: 20px;
            font-weight: 400;
          }

          ul {
            margin: 0;
            padding: 0;
          }

          li {
            list-style-type: none;
          }
        `}</style>
      </div>
    );
  }

  updateFilter = event => {
    this.setState({ filter: event.target.value.toLowerCase() });
  };

  getFilteredName(name) {
    const { filter } = this.state;
    const lowerCaseName = name.toLowerCase();
    let lastIndex = 0;
    const parts = [];

    for (let index = 0; index < filter.length; ++index) {
      const nextIndex = lowerCaseName.indexOf(filter[index], lastIndex);
      if (nextIndex === -1) {
        return null;
      }
      parts.push(nextIndex === lastIndex ? null : name.slice(lastIndex, nextIndex));
      parts.push(<b key={nextIndex}>{name[nextIndex]}</b>);
      lastIndex = nextIndex + 1;
    }

    if (lastIndex !== name.length) {
      parts.push(name.slice(lastIndex));
    }

    return parts;
  }
}
