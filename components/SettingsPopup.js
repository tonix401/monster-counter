import { Popup } from "./Popup.js";
import { SettingsRow } from "./SettingsRow.js";

export function SettingsPopup() {
    const popup = new Popup("Settings", 400);
    popup.appendChild(SettingsRow("showConditions"));
    popup.appendChild(SettingsRow("showStatus"));
    popup.appendChild(SettingsRow("showHealth"));
    popup.appendChild(SettingsRow("showChangeHp"));
    popup.appendChild(SettingsRow("autoRemoveDead"));
    popup.appendChild(SettingsRow("showXpCounter", globalThis.xpCounterService.hideXpCounter));
    return popup;
}