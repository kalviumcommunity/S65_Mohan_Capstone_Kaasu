export const ComponentFromString = ({ code }) => {
  const Component = new Function(`return ${code}`)(); // code must return a JSX element, not a string
  return Component;
};

