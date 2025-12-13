export class Popup {
    constructor(title, width = 400, onopen = () => {}) {
        this.onopen = onopen;

        // Popup window
        this.popupWindow = document.createElement("div");
        this.popupWindow.className = "popup-window";
        this.popupWindow.style.width = width + "px";
        if (title) {
            this.popupWindow.appendChild(
                document.createElement("h3")
            ).textContent = title;
        }

        // Shadow overlay
        this.popupShadow = document.createElement("div");
        this.popupShadow.className = "popup-after";
        this.popupShadow.onclick = () => {
            this.close();
        };

        // Container
        this.container = document.createElement("div");
        this.container.appendChild(this.popupShadow);
        this.container.appendChild(this.popupWindow);
    }

    appendChild = (element) => this.popupWindow.appendChild(element);
    open = () => {
        document.body.appendChild(this.container);
        this.onopen();
    };
    close = () => document.body.removeChild(this.container);
}
