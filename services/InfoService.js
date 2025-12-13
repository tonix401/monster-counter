export class InfoService {
    constructor() {
        this.monsterIndex = {};
        this.monsterDetails = {};
    }

    async updateMonsterIndex() {
        this.monsterIndex = await getAllMonsters();
        this.saveMonsterIndexToLocalStorage();
    }

    async addMonsterDetails(id) {
        this.monsterDetails[id] = await getMonsterInfoById(id);
        this.saveMonsterDetailsToLocalStorage();
    }

    getMonsterIdByName(name) {
        this.getMonsterIndexFromLocalStorage();
        for (const key in this.monsterIndex) {
            if (this.monsterIndex[key].name === name) {
                return this.monsterIndex[key].index;
            }
        }
        return null;
    }

    getMonsterDetails(id) {
        this.getMonsterDetailsFromLocalStorage();
        return this.monsterDetails[id] || null;
    }

    getMonsterNames() {
        this.getMonsterIndexFromLocalStorage();
        return Object.keys(this.monsterIndex).map(
            (monster) => this.monsterIndex[monster].name
        );
    }

    isMonsterDetailsAvailable(id) {
        this.getMonsterDetailsFromLocalStorage();
        return this.monsterDetails.hasOwnProperty(id);
    }

    getMonsterIndexFromLocalStorage() {
        const data = localStorage.getItem("monsterIndex");
        if (data) {
            this.monsterIndex = JSON.parse(data);
        }
    }

    saveMonsterIndexToLocalStorage() {
        localStorage.setItem("monsterIndex", JSON.stringify(this.monsterIndex));
    }

    getMonsterDetailsFromLocalStorage() {
        const data = localStorage.getItem(`monsterDetails`);
        if (data) {
            this.monsterDetails = JSON.parse(data);
        }
    }

    saveMonsterDetailsToLocalStorage() {
        localStorage.setItem("monsterDetails", JSON.stringify(this.monsterDetails));
    }
}

const APIURL = "https://www.dnd5eapi.co";

async function getAllMonsters() {
    const response = await fetch(APIURL + "/api/2014/monsters");
    if (!response.ok) {
        return Promise.resolve([]);
    }
    return Promise.resolve((await response.json()).results);
}

async function getMonsterInfoById(id) {
    const response = await fetch(APIURL + `/api/2014/monsters/${id}`);
    if (!response.ok) {
        return Promise.resolve(null);
    }
    return Promise.resolve(await response.json());
}
