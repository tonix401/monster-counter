export function StatusTableData(monster) {
    const statusCell = document.createElement('td');
    switch(true) {
        case (monster.hp <= 0):
            statusCell.textContent = 'Down';
            statusCell.style.color = 'var(--down)';
            break;
        case (monster.hp <= monster.maxhp / 4):
            statusCell.textContent = 'Badly Injured';
            statusCell.style.color = 'var(--damage)';
            break;
        case (monster.hp <= monster.maxhp / 2):
            statusCell.textContent = 'Injured';
            statusCell.style.color = 'var(--injured)';
            break;
        default:
            statusCell.textContent = 'Healthy';
            statusCell.style.color = 'var(--heal)';
    }
    return statusCell;
}