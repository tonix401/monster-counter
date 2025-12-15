export function TableColgroup() {
    const colgroup = document.createElement("colgroup");
    const cols = [];
    if (settingsManager.getValue("showQuickActions")) cols.push("actions");
    cols.push("name");
    if (settingsManager.getValue("showConditions")) cols.push("conditions");
    if (settingsManager.getValue("showStatus")) cols.push("status");
    if (settingsManager.getValue("showHealth")) cols.push("hp");
    if (settingsManager.getValue("showChangeHp")) cols.push("change-hp");

    for (const col of cols) {
        const colElement = document.createElement("col");
        colElement.id = `col-${col}`;
        colgroup.appendChild(colElement);
    }
    return colgroup;
}