export function HpTableData(monster) {
    const hpCell = document.createElement('td');
    hpCell.textContent = `${monster.hp > monster.maxhp ? `${monster.hp - monster.maxhp} + ` : ''}${Math.min(monster.hp, monster.maxhp)} / ${monster.maxhp}`;
    return hpCell;
}