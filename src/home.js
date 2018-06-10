import {
  CodeExample,
  Iterator,
  RandomNumberGenerator,
  Resetter,
  section,
  Setter,
  Toggler,
} from 'core';

function* counter() {
  let count = 0;

  for (;;) {
    yield count;
    count += 1;
  }
}

export default section()
  .description(
    `
      Welcome to the Pattern Library, the home of various components used in the Codility app!

      The documentation is kept up-to-date and is mostly based on examples of usage.

      The Pattern Library is used by designers and developers alike.

      ## Getting Started

      Documentation files are kept close to the described components and use the \`.docs.js\` extension.
      The documentation is automatically reloading when the source files are changed.

      *Note: All files are discovered during the start-up of the Pattern Library, so remember to restart after adding a new documentation file!*

      The backbones of the new documentation file are the \`section\` function and the \`CodeExample\` component.
      You can get them for free after running the \`yarn new-component\` command!

      The \`CodeExample\` component is special, because during compilation time (Babel) it receives its own source;
      that's why we are able to show components alongside the code that "makes" them.

      As for the \`section\` function, here's an example documentation file which should explain the basics:

      \`\`\`
      // Import your component
      import MyComponent from 'pattern-library/components/MyComponent';

      // And the helpers
      import { CodeExample, section } from 'ducc';

      // Pass the component to the \`section\` function so that it can get some info about props (it's optional)
      export default section(MyComponent)

        // You can provide a short description of the component (Markdown is supported)
        .description('This component is useful in some specific scenarios.')

        // You can also provide some additional info about props by using the \`.props\` method (Markdown is supported)
        .props({
          someSpecialProp: 'Here is some info about this specific prop.',
        })

        // Examples are added by using the \`.example\` method. In the one-argument version the example will be provided as-is
        .example(
          <CodeExample>
            <MyComponent />
          </CodeExample>
        )

        // You can also provide the example with a name...
        .example(
          'With the special prop',
          <CodeExample>
            <MyComponent someSpecialProp="some-value" />
          </CodeExample>
        )

        // ... or even a description! (of course Markdown is supported 😉)
        .example(
          'What if the component is used like so?',
          'Sometimes the component may end up looking funny - remember about this pro tip to avoid such situations.',
          <CodeExample>
            <MyComponent foo={42} />
          </CodeExample>
        );
      \`\`\`

      For more advanced usage check out the examples below:
    `,
  )
  .example(
    'The Iterator component',
    `
      Can be used for demoing the behavior of a component when transitioning state between given values.
      The \`iterable\` prop can be either an iterable or a function - the latter will be called to
      obtain the iterable (comes in handy for demoing with generators).
    `,
    <CodeExample imports="import { Iterator } from 'ducc';">
      <Iterator iterable={[0, 1, 2]}>{value => <div>Current value: {value}</div>}</Iterator>
      <Iterator iterable={counter} timeout={500}>
        {value => <div>Infinite counter: {value}</div>}
      </Iterator>
    </CodeExample>,
  )
  .example(
    'The RandomNumberGenerator component',
    'Can be used for demoing the behavior of a component when transitioning state between random values in a given range.',
    <CodeExample imports="import { RandomNumberGenerator } from 'ducc';">
      <RandomNumberGenerator min={1} max={1.5}>
        {value => <div>Current value: {value}</div>}
      </RandomNumberGenerator>
    </CodeExample>,
  )
  .example(
    'The Toggler component',
    'Can be used for demoing the behavior of a component when transitioning state between given values.',
    <CodeExample imports="import { Toggler } from 'ducc';">
      <Toggler toggleFoo={[0, 1, 2]}>
        {({ toggleFoo, value }) => <button onClick={toggleFoo}>Foo: {value}</button>}
      </Toggler>
    </CodeExample>,
  )
  .example(
    'The Setter component',
    'Can be used for demoing the behavior of a component when transitioning state between given values.',
    <CodeExample imports="import { Setter } from 'ducc';">
      <Setter setBar="bar">
        {({ setBar, state }) => (
          <div>
            <p>
              <button onClick={() => setBar('first')}>First</button>
              <button onClick={() => setBar('second')}>Second</button>
              <button onClick={() => setBar()}>Reset</button>
            </p>
            <p>Current state: {JSON.stringify(state)}</p>
          </div>
        )}
      </Setter>
    </CodeExample>,
  )
  .example(
    'The Resetter component',
    `
      Can be used for demoing a component that has an internal state that won't go to
      the initial state once changed (e.g. a dismissable notification).
    `,
    <CodeExample imports="import { Resetter, Setter } from 'ducc';">
      <Resetter>
        <Iterator iterable={counter} timeout={500}>
          {value => <div>Current value: {value}</div>}
        </Iterator>
      </Resetter>
    </CodeExample>,
  );
