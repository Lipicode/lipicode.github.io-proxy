"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");
/**
 * @type {HTMLDivElement}
 */
const spinner = document.getElementById("spinner");

/**
 * Toggle Dark Mode
 */
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

/**
 * Search suggestions feature
 */
address.addEventListener("input", () => {
  const query = address.value.trim();
  if (query.length > 2) {
    fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`)
      .then(response => response.json())
      .then(data => {
        const suggestions = data[1];
        // Process and display search suggestions (e.g., append them to a dropdown list)
      });
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  spinner.style.display = "block"; // Show loading spinner

  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    spinner.style.display = "none"; // Hide spinner
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

