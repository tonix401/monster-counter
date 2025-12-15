const SETTINGSCHEME = {
    showStatus: {
        name: 'Show Status',
        type: 'boolean',
        default: true,
        value: true
    },
    showHealth: {
        name: 'Show Health',
        type: 'boolean',
        default: true,
        value: true
    },
    showConditions: {
        name: 'Show Conditions',
        type: 'boolean',
        default: true,
        value: true
    },
    showChangeHp: {
        name: 'Show Change HP',
        type: 'boolean',
        default: true,
        value: true
    },
    customConditions: {
        name: 'Custom Conditions',
        type: 'array',
        default: [],
        value: []
    },
    autoRemoveDead: {
        name: 'Auto Remove Dead Monsters',
        type: 'boolean',
        default: false,
        value: false
    },
    showXpCounter: {
        name: 'Show XP Counter',
        type: 'boolean',
        default: true,
        value: true
    }
}

export class SettingsManager {
    constructor() {
        this.settings = this.getSettingsFromLocalStorage();
    }

    // Local Storage
    getSettingsFromLocalStorage() {
        const data = localStorage.getItem('settingsData');
        if(!data) {
            this.settings = Object.fromEntries(Object.entries(SETTINGSCHEME).map(([key, setting]) => [key, setting.default]));
            this.saveSettingsToLocalStorage();
            return this.settings;
        }
        return JSON.parse(data);
    }

    saveSettingsToLocalStorage() {
        localStorage.setItem('settingsData', JSON.stringify(this.settings));
    }

    getDefault(key) {
        if (!(key in SETTINGSCHEME)) {
            throw new Error(`Setting "${key}" does not exist.`);
        }
        return SETTINGSCHEME[key].default;
    }

    getName(key) {
        if (!(key in SETTINGSCHEME)) {
            throw new Error(`Setting "${key}" does not exist.`);
        }
        return SETTINGSCHEME[key].name;
    }

    getValue(key) {
        if (!(key in this.settings) && !(key in SETTINGSCHEME)) {
            throw new Error(`Setting "${key}" does not exist.`);
        }
        return this.settings[key];
    }

    setValue(key, value) {
        this.settings[key] = value;
        this.saveSettingsToLocalStorage();
        globalThis.updateTable();
    }
}