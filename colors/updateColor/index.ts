export const updateCSSVariables = async (className: string) => {
  const root = document.getElementById("layout");
  console.log("root", root);
  const themesColors: any[] = [
    "zinc",
    "slate",
    "stone",
    "gray",
    "natural",
    "red",
    "rose",
    "orange",
    "green",
    "blue",
    "yellow",
    "violet",
  ];
  await themesColors.forEach((each) => {
    root?.classList.remove(each);
  });
  root?.classList.add(className);
};
