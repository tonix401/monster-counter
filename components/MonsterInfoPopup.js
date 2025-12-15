import { Popup } from "./Popup.js";

export function MonsterInfoPopup(monsterDetailIndex) {
    const monsterDetails =
        globalThis.InfoManager.getMonsterDetails(monsterDetailIndex);
    if (!monsterDetails) {
        return new Popup("Monster details not found", 400);
    }
    const popup = new Popup(undefined, 1100);
    popup.appendChild(createNameAndPictureArea(monsterDetails));
    popup.appendChild(createDevider());

    const mainInfo = document.createElement("div");
    const infoFields = [
        { label: "Armor Class:", value: monsterDetails.armor_class[0].value },
        { label: "Hit Points:", value: monsterDetails.hit_points },
        {
            label: "Speed:",
            value: Object.entries(monsterDetails.speed)
                .map(([type, val]) => `${type}: ${val}`)
                .join(", "),
        },
    ];
    infoFields.forEach((field) => {
        mainInfo.appendChild(createAttributeRow(field.label, field.value));
    });
    popup.appendChild(mainInfo);
    popup.appendChild(createDevider());

    const attributes = document.createElement("div");
    attributes.classList.add("attribute-area");
    const attrNames = [
        { label: "STR", key: "strength" },
        { label: "DEX", key: "dexterity" },
        { label: "CON", key: "constitution" },
        { label: "INT", key: "intelligence" },
        { label: "WIS", key: "wisdom" },
        { label: "CHA", key: "charisma" },
    ];
    attrNames.forEach((attr) => {
        const block = document.createElement("div");
        const attrValue = monsterDetails[attr.key];
        const modifier = Math.floor((attrValue - 10) / 2);
        block.appendChild(
            createAttributeRow(
                attr.label,
                `${attrValue} (${modifier >= 0 ? "+" : ""}${modifier})`,
                true
            )
        );
        attributes.appendChild(block);
    });

    popup.appendChild(attributes);
    popup.appendChild(createDevider());
    const moreInfos = [
        {
            label: "Proficiencies: ",
            value: monsterDetails.proficiencies
                .map((prof) => `${prof.proficiency.name}: +${prof.value}`)
                .join(", "),
        },
        {
            label: "Damage Vulnerabilities: ",
            value: monsterDetails.damage_vulnerabilities.join(", "),
        },
        {
            label: "Damage Resistances: ",
            value: monsterDetails.damage_resistances.join(", "),
        },
        {
            label: "Damage Immunities: ",
            value: monsterDetails.damage_immunities.join(", "),
        },
        {
            label: "Condition Immunities: ",
            value: monsterDetails.condition_immunities
                .map((ci) => ci.name)
                .join(", "),
        },
        {
            label: "Senses: ",
            value: Object.entries(monsterDetails.senses)
                .map(([sense, val]) => `${sense.replace(/_/g, " ")}: ${val}`)
                .join(", "),
        },
        {
            label: "Languages: ",
            value: monsterDetails.languages,
        },
        {
            label: "Challenge Rating: ",
            value:
                monsterDetails.challenge_rating + ` (${monsterDetails.xp} XP)`,
        },
    ];
    moreInfos.forEach((info) => {
        popup.appendChild(createAttributeRow(info.label, info.value));
    });
    if (monsterDetails.special_abilities.length > 0) {
        popup.appendChild(createDevider());
        const heading = document.createElement("h3");
        heading.textContent = "Special Abilities";
        popup.appendChild(heading);
        monsterDetails.special_abilities.forEach((ability) => {
            popup.appendChild(createAttributeRow(ability.name, ability.desc));
        });
    }
    if (monsterDetails.actions.length > 0) {
        popup.appendChild(createDevider());
        const heading = document.createElement("h3");
        heading.textContent = "Actions";
        popup.appendChild(heading);
        monsterDetails.actions.forEach((action) => {
            popup.appendChild(createAttributeRow(action.name, action.desc));
        });
    }
    if (monsterDetails.legendary_actions.length !== 0) {
        popup.appendChild(createDevider());
        const heading = document.createElement("h3");
        heading.textContent = "Legendary Actions";
        popup.appendChild(heading);
        monsterDetails.legendary_actions.forEach((action) => {
            popup.appendChild(createAttributeRow(action.name, action.desc));
        });
    }

    return popup;
}

function createDevider() {
    const divider = document.createElement("hr");
    divider.style.margin = "10px 0";
    return divider;
}

function createAttributeRow(attrName, attrValue, column = false) {
    const row = document.createElement("div");
    if (attrValue !== 0 && !attrValue) {
        return row;
    }
    if (column) {
        row.classList.add("attribute-column");
    }
    row.classList.add("attribute-row");
    const nameElem = document.createElement("strong");
    nameElem.textContent = attrName;
    row.appendChild(nameElem);

    const valueElem = document.createElement("span");
    valueElem.textContent = attrValue;
    row.appendChild(valueElem);

    return row;
}

function createNameAndPictureArea(monsterDetails) {
    const area = document.createElement("div");
    area.classList.add("monster-name-picture-area");
    const nameSubArea = document.createElement("div");
    nameSubArea.classList.add("monster-name-area");
    area.appendChild(nameSubArea);
    const nameElem = document.createElement("h2");
    nameElem.textContent = monsterDetails.name;
    const typeLine = document.createElement("span");
    typeLine.textContent = `${monsterDetails.size} ${monsterDetails.type}, ${monsterDetails.alignment}`;
    nameSubArea.appendChild(nameElem);
    nameSubArea.appendChild(typeLine);
    const image = document.createElement("img");
    image.src = "https://dnd5eapi.co" + monsterDetails.image;
    image.alt = monsterDetails.name;
    image.classList.add("monster-image");
    area.appendChild(image);
    return area;
}
