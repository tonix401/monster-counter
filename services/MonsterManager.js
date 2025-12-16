class Monster {
    constructor(name, hp, detailIndex) {
        this.id =
            Date.now().toString() + Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.detailIndex = detailIndex;
        this.hp = hp;
        this.maxhp = hp;
        this.hasDiedAlready = false;
        this.conditions = [];
    }
}

export class MonsterManager {
    constructor() {
        this.monsters = this.getMonstersFromLocalStorage() || [];
    }

    add = (name, hp, amount = 1) => {
        const newMonsters = [];
        if (amount === 1) {
            newMonsters.push(
                new Monster(
                    name,
                    hp,
                    name.toLowerCase().trim().replace(/\s+/g, "-")
                )
            );
        } else {
            for (let i = 0; i < amount; i++) {
                const monster = new Monster(
                    `${name} ${i + 1}`,
                    hp,
                    name.toLowerCase().trim().replace(/\s+/g, "-")
                );
                newMonsters.push(monster);
            }
        }
        this.monsters = this.monsters.concat(newMonsters);
        this.saveMonstersToLocalStorage();
        globalThis.updateTable();
        return newMonsters;
    };

    remove = (monsterId) => {
        this.monsters = this.monsters.filter(
            (monster) => monster.id !== monsterId
        );
        this.saveMonstersToLocalStorage();
        globalThis.updateTable();
    };

    removeDead = () => {
        this.monsters = this.monsters.filter((monster) => monster.hp > 0);
        this.saveMonstersToLocalStorage();
        globalThis.updateTable();
    };

    clear = () => {
        this.monsters = [];
        this.saveMonstersToLocalStorage();
        globalThis.updateTable();
    };

    saveMonstersToLocalStorage = () => {
        localStorage.setItem("monstersData", JSON.stringify(this.monsters));
    };

    getMonstersFromLocalStorage = () => {
        const data = localStorage.getItem("monstersData");
        return data ? JSON.parse(data) : [];
    };

    updateMonsterHealth = (monsterId, amount) => {
        const monster = this.monsters.find((m) => m.id === monsterId);
        if (!monster) return;
        monster.hp = Math.max(0, monster.hp + amount);
        if (monster.hp === 0) {
            this.addMonsterXPToCounter(monsterId);
            if (globalThis.settingsManager.getValue("autoRemoveDead")) {
                this.remove(monsterId);
            }
        }
        this.saveMonstersToLocalStorage();
        globalThis.updateTable();
    };

    killAll() {
        const length = this.monsters.length;
        this.monsters.forEach(async (monster, index) => {
            const delay = length > 5 ? Math.round((index * 1500) / length) : 0;
            setTimeout(() => {
                this.killMonster(monster.id);
            }, delay);
        });
    }
    
    killMonster = (monsterId) => {
        const monster = this.monsters.find((m) => m.id === monsterId);
        if (!monster) return;
        this.updateMonsterHealth(monsterId, -monster.hp);
        this.addMonsterXPToCounter(monster.id);
    }

    addMonsterCondition = (monsterId, condition) => {
        const monster = this.monsters.find((m) => m.id === monsterId);
        if (monster && !monster.conditions.includes(condition)) {
            monster.conditions.push(condition);
            this.saveMonstersToLocalStorage();
            globalThis.updateTable();
        }
    };

    removeMonsterCondition = (monsterId, condition) => {
        const monster = this.monsters.find((m) => m.id === monsterId);
        if (monster) {
            monster.conditions = monster.conditions.filter(
                (c) => c !== condition
            );
            this.saveMonstersToLocalStorage();
            globalThis.updateTable();
        }
    };

    addMonsterXPToCounter = (monsterId) => {
        const monster = this.monsters.find((m) => m.id === monsterId);
        if (!monster || monster.hasDiedAlready) return;
        const monsterDetails = globalThis.InfoManager.getMonsterDetails(
            monster.detailIndex
        );
        globalThis.XpCounterManager.updateXp(monsterDetails.xp);
        monster.hasDiedAlready = true;
    };

    pushDownload = () => {
        const data = {
            xpCounter: globalThis.XpCounterManager.xpCounter,
            monsterIndex: globalThis.InfoManager.monsterIndex,
            monsterDetails: globalThis.InfoManager.monsterDetails,
            settings: globalThis.settingsManager.settings,
            monsters: this.monsters,
            xp: globalThis.XpCounterManager.xp,
        }
        const dataJson = JSON.stringify(data, null, 2);
        const blob = new Blob([dataJson], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "monster-counter-save-file.json";
        link.click();
        URL.revokeObjectURL(url);
    }
}