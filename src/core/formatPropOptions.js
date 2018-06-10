export default function formatPropOptions(options, addPrefix = true) {
  const formattedOptions = options.map(options => `\`${JSON.stringify(options)}\``).join(', ');
  if (addPrefix) {
    return `Can be one of: ${formattedOptions}.`;
  }
  return formattedOptions;
}
