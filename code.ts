// @ts-nocheck
import buildIconColumn from "./src/buildIconGrid.ts";

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
};

loadFonts()
  .then(() => {
    buildIconColumn()
  })
  .finally(() => figma.closePlugin());
