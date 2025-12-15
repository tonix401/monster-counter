export function QuickActionsTableData(monsterId) {
    const td = document.createElement("td");
    const container = document.createElement("div");
    container.className = "quick-actions-container";
    td.appendChild(container);

    // Kill Button
    const killButton = document.createElement("button");
    killButton.classList.add("red-button");
    killButton.classList.add("icon-button");
    killButton.title = "Kill Monster";
    killButton.onclick = () => {
        globalThis.monsterManager.killMonster(monsterId);
    };
    const trashIcon = document.createElement("img");
    trashIcon.src = "./resources/skull.svg";
    trashIcon.alt = "Kill Monster";
    killButton.appendChild(trashIcon);

    // Remove Button
    const removeButton = document.createElement("button");
    removeButton.classList.add("red-button");
    removeButton.classList.add("icon-button");
    removeButton.title = "Remove Monster";
    removeButton.onclick = () => {
        globalThis.monsterManager.remove(monsterId);
    };
    const binIcon = document.createElement("img");
    binIcon.src = "./resources/bin.svg";
    binIcon.alt = "Remove Monster";
    removeButton.appendChild(binIcon);

    container.appendChild(killButton);
    container.appendChild(removeButton);
    td.appendChild(container);
    return td;
}