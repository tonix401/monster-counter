import { Popup } from "./Popup.js";
import { MonsterSuggestionInput } from "./MonsterSuggestionInput.js";

export const AddMonsterPopup = () => {
    const hpInput = document.createElement("input");
    const nameInput = MonsterSuggestionInput((hp) => {
        hpInput.value = hp;
    });
    const popup = new Popup("Add Monster", 300, focusOnNameInput);
    popup.appendChild(nameInput);

    hpInput.type = "number";
    hpInput.placeholder = "HP";
    popup.appendChild(hpInput);

    const amountInput = document.createElement("input");
    amountInput.type = "number";
    amountInput.placeholder = "Amount";
    popup.appendChild(amountInput);

    const addButton = document.createElement("button");
    addButton.className = "green-button";
    addButton.textContent = "Add Monster";

    nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            hpInput.focus();
        }
    });

    hpInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            amountInput.focus();
        }
    });

    amountInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addButton.focus();
        }
    });

    const trySavingAndClose = () => {
        const nameInput = document.getElementById("monster-suggestion-input"); 
        const name = nameInput.value.trim();
        const hp = parseInt(hpInput.value) || 1;
        const amount = parseInt(amountInput.value) || 1;

        nameInput.value = "";
        hpInput.value = "";
        amountInput.value = "";

        if (name === "") {
            alert("Cannot save a monster without a name");
            return;
        }
        globalThis.monsterManager.add(name, hp, amount);
        popup.close();
    };

    addButton.onclick = trySavingAndClose;
    popup.appendChild(addButton);
    return popup;
}

function focusOnNameInput() {
    const nameInput = document.getElementById("monster-suggestion-input");
    if (nameInput) {
        nameInput.focus();
    }
}
