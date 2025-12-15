import { MonsterInfoPopup } from "./MonsterInfoPopup.js";

export function NameTableData(monster) {
    const nameCell = document.createElement("td");
    nameCell.title = `Monster Sheet: ${monster.name}`;
    nameCell.className = "name-cell";
    const nameLabel = document.createElement("span");
    nameLabel.textContent = `${monster.hp > 0 ? "" : "💀  "}${monster.name}`;
    if (globalThis.InfoManager.isMonsterDetailsAvailable(monster.detailIndex)) {
        const popup = MonsterInfoPopup(monster.detailIndex);
        nameLabel.classList.add("clickable");
        nameLabel.addEventListener("click", () => {
            popup.open();
        });
    }

    nameCell.appendChild(nameLabel);
    nameCell.style.color = monster.hp > 0 ? "inherit" : "gray";
    return nameCell;
}
