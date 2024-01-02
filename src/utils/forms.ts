function setupClearSearchButton() {
  const clearButton =
    document.querySelector<HTMLButtonElement>("#clear-search")!;
  const url = new URL(window.location.href);
  url.searchParams.delete("search");

  clearButton.addEventListener("click", () => {
    window.location.href = url.href;
  });
}

function setupClearFiltersButton() {
  const clearButton =
    document.querySelector<HTMLButtonElement>("#clear-filters")!;
  const url = new URL(window.location.href);
  url.searchParams.delete("filter");

  clearButton.addEventListener("click", () => {
    window.location.href = url.href;
  });
}

function setupFilterForm() {
  const filters = document.querySelectorAll<HTMLLabelElement>(
    "#filters label[role='button']"
  )!;
  filters.forEach((label) => {
    label.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const target = event.target as HTMLLabelElement;
        const input = target.querySelector("input")!;
        input.checked = !input.checked;
      }
    });
  });
}

setupClearSearchButton();
setupClearFiltersButton();
setupFilterForm();
