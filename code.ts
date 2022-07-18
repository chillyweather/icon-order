// @ts-nocheck
//* test file for all the bullshit i think about

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
};

//#region DO NOT DELETE

//
// const textSizes = {
//   xs: 12,
//   s: 14,
//   m: 18,
//   l: 26,
//   xl: 40,
// };
//
// const fonts = ["regular", "bold"];
// const colors = ["dark", "primary"];
//
// function buildStylesObjects() {
//   const styleObjects = [];
//   for (const key in textSizes) {
//     let styleObject = {};
//     styleObject.sizeName = `${key}`;
//     styleObject.size = textSizes[key];
//     for (let font of fonts) {
//       styleObject.font = font;
//       for (let color of colors) {
//         styleObject.color = color;
//         const styleToPush = {
//           ...styleObject,
//         };
//         styleObjects.push(styleToPush);
//       }
//     }
//   }
//   return styleObjects;
// }
//
// const textStyleObjects = buildStylesObjects();
//
// loadFonts()
//   .then(() => {
//     textStyleObjects.forEach((obj) => {
//       const textStyleComp = figma.createComponent();
//       const textStyleCompText = figma.createText();
//       textStyleComp.appendChild(textStyleCompText);
//       textStyleCompText.fills = [
//         { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
//       ];
//
//       textStyleCompText.fontSize = obj.size;
//       textStyleCompText.characters = `Title ${obj.sizeName}`;
//       obj.font === "bold"
//         ? (textStyleCompText.fontName = {
//             family: "Inter",
//             style: "Regular",
//           })
//         : (textStyleCompText.fontName = {
//             family: "Inter",
//             style: "Bold",
//           });
//       obj.color === "primary"
//         ? (textStyleCompText.fills = [
//             { type: "SOLID", color: { r: 1, g: 0, b: 0 } },
//           ])
//         : (textStyleCompText.fills = [
//             { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
//           ]);
//       textStyleComp.name = `.ds_title/${obj.sizeName}/${obj.font}/${obj.color}`;
//       textStyleComp.layoutPositioning = "AUTO";
//       textStyleComp.layoutMode = "HORIZONTAL";
//       textStyleComp.primaryAxisSizingMode = "AUTO";
//       textStyleComp.counterAxisSizingMode = "AUTO";
//
//       const titles = figma.currentPage.findAll((node) =>
//         node.name.includes(".ds_title")
//       );
//       console.log(titles);
//     });
//   })
//   .finally(() => figma.closePlugin());
//#endregion
//

//& find right set and right component inside it
function findTitleComponent() {
  const iconLabel = figma.root.findOne((node) => {
    const result = node.name === ".ds_title" && node.type === "COMPONENT_SET";
    return result;
  });
  return iconLabel.children.filter(
    (node) => node.name === "size=xs, font=regular, color=dark"
  )[0];
}

const select = figma.currentPage.selection;

function attachLabelToIcon(icon: any) {
  const labelXS = findTitleComponent();
  const label = labelXS.createInstance();
  label.y = icon.y;
  label.x = icon.x + 26;
  label.children[0].characters = icon.name;
  const iconPlusLabel = figma.createFrame();
  iconPlusLabel.layoutPositioning = "AUTO";
  iconPlusLabel.layoutMode = "HORIZONTAL";
  iconPlusLabel.counterAxisSizingMode = "AUTO";
  iconPlusLabel.itemSpacing = 10;
  iconPlusLabel.appendChild(icon);
  iconPlusLabel.appendChild(label);
  iconPlusLabel.fills = [];
  return iconPlusLabel;
  // const iconPlusLabel = figma.group([icon[0], label], figma.currentPage);
}

loadFonts()
  .then(() => {
    if (select.length === 1) {
      attachLabelToIcon(select[0]);
    }
    if (select.length > 1) {
      let yPos = 0;
      select.forEach((item) => {
        const row = attachLabelToIcon(item);
        row.x = 0;
        row.y = yPos;
        yPos += 40;
        figma.ungroup(row);
      });
    }
  })
  .finally(() => figma.closePlugin());
