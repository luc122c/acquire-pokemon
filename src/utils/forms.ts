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
  const buttons = document.querySelectorAll<HTMLLabelElement>(
    "#filters label[role='button']"
  )!;
  // Enter key toggles checkboxes
  // Default behaviour is for the label click to toggle the checkbox
  buttons.forEach((label) => {
    label.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const target = event.target as HTMLLabelElement;
        const input = target.querySelector("input")!;
        input.checked = !input.checked;
      }
    });
    // Toggle existing filters
    const query = new URLSearchParams(window.location.search).getAll("filter");
    const inputs =
      document.querySelectorAll<HTMLInputElement>("#filters input")!;
    inputs.forEach((input) => {
      if (query.includes(input.value)) {
        input.checked = true;
      }
    });
  });
}

setupClearSearchButton();
setupClearFiltersButton();
setupFilterForm();
