// @ts-nocheck
//* test file for all the bullshit i think about

const loadFonts = async () => {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
};

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
