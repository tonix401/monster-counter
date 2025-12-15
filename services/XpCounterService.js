export class XpCounterService {
    constructor() {
        this.xp = this.getXpFromLocalStorage();
        this.updateXp(0);
        this.hideXpCounter(settingsManager.getValue("showXpCounter"));
    }

    updateXp(amount) {
        const oldXp = this.xp;
        this.xp += amount;
        this.saveXpToLocalStorage();
        animateXpCounter(oldXp, this.xp);
    }

    resetXp() {
        const oldXp = this.xp;
        this.xp = 0;
        this.saveXpToLocalStorage();
        animateXpCounter(oldXp, this.xp, 1000);
    }

    saveXpToLocalStorage() {
        localStorage.setItem("currentXp", this.xp.toString());
    }

    getXpFromLocalStorage() {
        const data = localStorage.getItem("currentXp");
        if (data) {
            return parseInt(data) || 0;
        }
        return 0;
    }

    hideXpCounter(value) {
        const xpCounter = document.getElementById("xp-counter");
        xpCounter.style.display = value ? "inline-block" : "none";
    }
}

function animateXpCounter(oldXp, newXp, duration = 3000) {
    const xpCounter = document.getElementById("xp-counter");
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.round(oldXp + (newXp - oldXp) * progress);
        xpCounter.textContent = current + " XP";
        if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
