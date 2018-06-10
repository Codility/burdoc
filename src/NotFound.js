import { Markdown } from 'core';

export default function NotFound() {
  return (
    <Markdown>{`
      ## Page not found 😞

      The page you are looking for might have been removed recently.

      You can still visit any of the pages on listed the left.
    `}</Markdown>
  );
}
