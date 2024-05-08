export const updateCSSVariables = (isDark: boolean, colorObject: any) => {
  const root = document.documentElement;

  if (isDark) {
    // Update variables for dark theme
    Object.keys(colorObject.dark).forEach((color: any) => {
      root.style.setProperty(`${color}`, colorObject[color]);
    });
  } else {
    // Update variables for light theme
    Object.keys(colorObject.light).forEach((color: any) => {
      root.style.setProperty(`${color}`, colorObject[color]);
    });
  }
};
