import { NameTableData } from "./NameTableData.js";
import { ConditionsTableData } from "./ConditionsTableData.js";
import { StatusTableData } from "./StatusTableData.js";
import { HpTableData } from "./HpTableData.js";
import { ChangeHpTableData } from "./ChangeHpTableData.js";

export function MonsterTableRow(monster) {
    const row = document.createElement('tr');           
    row.appendChild(NameTableData(monster));
    if (settingsManager.getValue("showConditions")) row.appendChild(ConditionsTableData(monster));
    if (settingsManager.getValue("showStatus")) row.appendChild(StatusTableData(monster));
    if (settingsManager.getValue("showHealth")) row.appendChild(HpTableData(monster));
    if (settingsManager.getValue("showChangeHp")) row.appendChild(ChangeHpTableData(monster));
    return row;
}