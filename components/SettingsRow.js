export function SettingsRow(id, onchange) {
    const value = settingsManager.getValue(id);
    const row = document.createElement("div");
    row.className = "settings-row";
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = settingsManager.getName(id);
    row.appendChild(label);
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.checked = value;
    input.onchange = () => {
        settingsManager.setValue(id, input.checked);
        if (onchange) onchange(input.checked);
    };
    row.appendChild(input);
    return row;
}