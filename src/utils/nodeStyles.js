export const getNodeCardStyle = (config, size) => {
  const baseStyle = {
    // default inline css
  };

  if (config.type === 'text') {
    return {
      ...baseStyle,
      width: `${size.width}px`,
      height: `${size.height}px`,
    };
  }

  return {
    ...baseStyle,
  };
};
