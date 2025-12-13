export function ChangeHpTableData(monster) {
    const monsterManager = globalThis.monsterManager;
    const damageCell = document.createElement('td');
    const wrapper = document.createElement('div');
    wrapper.className = 'damage-cell';
    damageCell.appendChild(wrapper);

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.placeholder = 'Amount';
    input.title = "Enter to damage; Shift + Enter to heal";
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const value = parseInt(input.value, 10);
            if (!isNaN(value)) {
                monsterManager.updateMonsterHealth(monster.id, event.shiftKey ? value : -value);
                input.value = '';
            }
        }
    });

    const damageButton = document.createElement('button');
    damageButton.className = 'damage-button';
    damageButton.onclick = () => {
        const value = parseInt(input.value, 10);
        if (!isNaN(value)) {
            monsterManager.updateMonsterHealth(monster.id, -value);
            input.value = '';
        } else if (input.value === '') {
            monsterManager.updateMonsterHealth(monster.id, -1);
        }
    };
    damageButton.textContent = '⮟';

    const healButton = document.createElement('button');
    healButton.className = 'heal-button';
    healButton.onclick = () => {
        const value = parseInt(input.value, 10);
        if (!isNaN(value)) {
            monsterManager.updateMonsterHealth(monster.id, value);
            input.value = '';
        } else if (input.value === '') {
            monsterManager.updateMonsterHealth(monster.id, 1);
        }
    };
    healButton.textContent = '⮝';

    wrapper.appendChild(healButton);
    wrapper.appendChild(input);
    wrapper.appendChild(damageButton);
    return damageCell;
}