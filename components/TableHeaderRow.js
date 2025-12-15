export function TableHeadersTableRow() {
    const headerRow = document.createElement("tr");

    const settings = [];
    if(settingsManager.getValue("showQuickActions")) settings.push("Actions");
    settings.push("Name");
    if (settingsManager.getValue("showConditions")) settings.push("Conditions");
    if (settingsManager.getValue("showStatus")) settings.push("Status");
    if (settingsManager.getValue("showHealth")) settings.push("HP");
    if (settingsManager.getValue("showChangeHp")) settings.push("Change HP");

    for (const s of settings) {
        const th = document.createElement("th");
        th.id = `header-row-${s.toLowerCase().replace(" ", "-")}`;
        th.textContent = s;
        headerRow.appendChild(th);
    }

    return headerRow;
}
