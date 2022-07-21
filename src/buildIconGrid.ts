// @ts-nocheck
import attachLabelToIcon from "./attachLabelToIcon.ts";
import splitArray from "./splitArray.ts";

function buildIconColumn() {
  const select = figma.currentPage.selection;
  const selectionParent = select[0].parent;
  const limit = 12;

  const xP = select[0].x;
  const yP = select[0].y;

  if (select.length === 1) {
    const iconPlusLabel = attachLabelToIcon(select[0]);
    iconPlusLabel.x = xP;
    iconPlusLabel.y = yP;
    selectionParent.appendChild(iconPlusLabel);
  }

  if (select.length > 1) {
    const yPos = yP;
    const xPos = xP;
    const rows = [];
    select.forEach((item) => {
      rows.push(item);
    });

    const result = rows.sort((a, b) => {
      let fa = a.name.toLowerCase(),
        fb = b.name.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });

    if (limit > 0) {
      const iconFrame = figma.createFrame();
      iconFrame.layoutPositioning = "AUTO";
      iconFrame.layoutMode = "HORIZONTAL";
      iconFrame.counterAxisAlignItems = "MIN";
      iconFrame.counterAxisSizingMode = "AUTO";
      iconFrame.primaryAxisAlignItems = "SPACE_BETWEEN";
      iconFrame.name = "icon frame";
      iconFrame.itemSpacing = 40;

      function createColumn() {
        const iconColumn = figma.createFrame();
        iconColumn.layoutPositioning = "AUTO";
        iconColumn.layoutMode = "VERTICAL";
        iconColumn.counterAxisAlignItems = "MIN";
        iconColumn.counterAxisSizingMode = "AUTO";
        iconColumn.primaryAxisAlignItems = "SPACE_BETWEEN";
        iconColumn.itemSpacing = 20;
        iconColumn.name = "icon column";
        return iconColumn;
      }

      const iconGrid = splitArray(result, limit);

      iconGrid.forEach((group) => {
        console.log("group");
        const newColumn = createColumn();
        group.forEach((item) => {
          const row = attachLabelToIcon(item);
          row.name = "icon+label";
          console.log(row);
          newColumn.appendChild(row);
        });
        iconFrame.appendChild(newColumn);
      });
      selectionParent.appendChild(iconFrame);
      iconFrame.x = xP;
      iconFrame.y = yP;
    }

    //     const iconColumn = figma.createFrame();
    //     iconColumn.layoutPositioning = "AUTO";
    //     iconColumn.layoutMode = "VERTICAL";
    //     iconColumn.counterAxisAlignItems = "MIN";
    //     iconColumn.counterAxisSizingMode = "AUTO";
    //     iconColumn.primaryAxisAlignItems = "SPACE_BETWEEN";
    //     iconColumn.itemSpacing = 10;
    //     iconColumn.name = "icons with labels";
    //
    //     result.forEach((item) => {
    //       const row = attachLabelToIcon(item);
    //       row.name = "icon+label";
    //       iconColumn.appendChild(row);
    //       row.x = 0;
    //       row.y = yPos;
    //       yPos += 40;
    //     });
    //
    //     iconColumn.x = xP;
    //     iconColumn.y = yP;
    //
    //     selectionParent.appendChild(iconColumn);
  }
}

export default buildIconColumn;
