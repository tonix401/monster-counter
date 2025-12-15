export function MonsterSuggestionInput(changeHPInput) {
    const monsterNames = globalThis.infoService.getMonsterNames();

    const input = document.createElement("input");
    input.id = "monster-suggestion-input";
    input.placeholder = "Name";

    const suggestionsContainer = document.createElement("div");
    suggestionsContainer.style.display = "none";
    suggestionsContainer.classList.add("suggestions-container");

    const container = document.createElement("div");
    container.classList.add("suggestion-input-container");
    container.appendChild(input);
    container.appendChild(suggestionsContainer);
    let highlightedIndex = -1;

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase();
        const filteredOptions = monsterNames.filter((option) =>
            option.toLowerCase().includes(query)
        );

        // Clear previous suggestions
        suggestionsContainer.innerHTML = "";

        if (filteredOptions.length === 0 || query === "") {
            suggestionsContainer.style.display = "none";
            return;
        }

        // Display matching suggestions
        filteredOptions.forEach((option) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.classList.add("suggestion-item");
            suggestionItem.textContent = option;
            suggestionItem.addEventListener("click", () => {
                input.value = option;
                input.dispatchEvent(new Event("change"));
                suggestionsContainer.style.display = "none";
            });

            suggestionsContainer.appendChild(suggestionItem);
        });

        suggestionsContainer.style.display = "block";
        highlightedIndex = -1;
    });

    input.addEventListener("keydown", (e) => {
        const suggestions = document.querySelectorAll(".suggestion-item");

        if (e.key === "ArrowDown") {
            if (highlightedIndex < suggestions.length - 1) {
                highlightedIndex++;
                updateHighlightedItem(suggestions);
            }
        } else if (e.key === "ArrowUp") {
            if (highlightedIndex > 0) {
                highlightedIndex--;
                updateHighlightedItem(suggestions);
            }
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            input.value = suggestions[highlightedIndex].textContent;
            suggestionsContainer.style.display = "none";
        }
    });

    input.addEventListener("change", async () => {
        if (!monsterNames.includes(input.value)) return;

        const id = globalThis.infoService.getMonsterIdByName(input.value);
        await globalThis.infoService.addMonsterDetails(id);
        const details = globalThis.infoService.getMonsterDetails(id);
        changeHPInput(details.hit_points);
    });

    function updateHighlightedItem(suggestions) {
        suggestions.forEach((item, index) => {
            item.classList.remove("highlighted");
            if (index === highlightedIndex) {
                item.classList.add("highlighted");
            }
        });
    }
    return container;
}
