import { noop } from 'lodash';
import { Component, Fragment } from 'react';
import getDisplayName from 'react-display-name';

import Markdown from 'core/Markdown';
import Prop from 'core/Prop';

const noopContents = String(noop);

function formatDefaultProp(defaultProps, name) {
  if (!defaultProps || typeof defaultProps[name] === 'undefined') {
    return;
  }
  const formatted = JSON.stringify(defaultProps[name]);
  if (formatted === noopContents) {
    return 'noop function';
  }
  return formatted;
}

  function NoComponent() {
  return null;
}

export default function section(DescribedComponent = NoComponent) {
  return class Section extends Component {
    static displayName = `Section<${getDisplayName(DescribedComponent)}>`

    static description(description) {
      this.state.description = <Markdown>{description}</Markdown>;
      return this;
    }

    static props(meta) {
      this.state.propsMeta = meta;
      return this;
    }

    static example(...args) {
      let name;
      let description;
      let codeExample;

      switch (args.length) {
        case 1:
          [codeExample] = args;
          break;
        case 2:
          [name, codeExample] = args;
          break;
        default:
          [name, description, codeExample] = args;
          break;
      }

      if (typeof description === 'string') {
        description = <Markdown>{description}</Markdown>;
      }

      this.state.examples.push({ name, description, codeExample });
      return this;
    }

    static getProps() {
      if (!DescribedComponent || !DescribedComponent.propTypes) {
        return;
      }

      const props = [];

      for (const [name, checker] of Object.entries(DescribedComponent.propTypes)) {
        const propMeta =
          typeof this.state.propsMeta[name] === 'string'
            ? { description: this.state.propsMeta[name] }
            : this.state.propsMeta[name];

        if (propMeta && propMeta.hidden) {
          continue;
        }

        props.push({
          name,
          defaultValue: formatDefaultProp(DescribedComponent.defaultProps, name),
          // The PropTypes.*.isRequired object does not have the isRequired property - this is used for discerning
          isRequired: !checker.isRequired,
          ...propMeta,
        });
      }

      props.sort((a, b) => a.name.localeCompare(b.name));

      return (
        <Fragment>
          <h2>Props</h2>
          <ul>{props.map(propProps => <Prop key={propProps.name} {...propProps} />)}</ul>
        </Fragment>
      );
    }

    static getExamplesHeader() {
      switch (this.state.examples.length) {
        case 0:
          return null;
        case 1:
          return <h2>Example</h2>;
        default:
          return <h2>Examples</h2>;
      }
    }

    static state = {
      description: null,
      examples: [],
      propsMeta: {},
    };

    render() {
      return (
        <Fragment>
          {Section.state.description}
          {Section.getProps()}
          {Section.getExamplesHeader()}
          {Section.state.examples.map(({ name, description, codeExample }, index) => (
            <Fragment key={index}>
              {name && <h3>{name}</h3>}
              {description}
              {codeExample}
            </Fragment>
          ))}
        </Fragment>
      );
    }
  };
}
