const CONDITIONS = [
  "Blinded",
  "Charmed",
  "Deafened",
  "Frightened",
  "Grappled",
  "Incapacitated",
  "Invisible",
  "Paralyzed",
  "Petrified",
  "Poisoned",
  "Prone",
  "Restrained",
  "Stunned",
  "Unconscious",
];

export function ConditionsTableData(monster) {
  const conditionsCell = document.createElement("td");
  monster.conditions.forEach((condition) => {
    conditionsCell.appendChild(ConditionTag(monster, condition));
  });
  conditionsCell.appendChild(AddConditionSelect(monster));
  return conditionsCell;
}

function ConditionTag(monster, condition) {
  const tag = document.createElement("button");
  tag.className = "condition-tag red-button";
  tag.appendChild(document.createTextNode(condition));
  tag.onclick = () => {
    globalThis.monsterManager.removeMonsterCondition(monster.id, condition);
  };
  tag.onmouseover = () => {
    tag.textContent = "Remove";
  };
  tag.onmouseout = () => {
    tag.textContent = condition;
  };
  return tag;
}

function AddConditionSelect(monster) {
  const select = document.createElement("select");
  select.className = "add-condition-tag green-button";
  select.textContent = "Add Condition";
  const allConditions = CONDITIONS;
  const remainingConditions = allConditions
    .sort()
    .filter((c) => !monster.conditions.includes(c));

  if (remainingConditions.length === 0) {
    return document.createElement("div");
  }

  select.appendChild(new Option("Add Condition", "", true));

  remainingConditions.forEach((condition) => {
    const option = new Option(condition, condition);
    select.appendChild(option);
  });

  select.onchange = () => {
    if (select.value) {
      globalThis.monsterManager.addMonsterCondition(monster.id, select.value);
      select.value = "";
    }
  };

  return select;
}
