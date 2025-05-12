// This is a fallback file that redirects to the actual pagefind.js file
(function () {
  const script = document.createElement("script");
  script.src = "/pagefind/pagefind.js";
  script.onload = function () {
    // Copy all exports from the loaded script to the current window
    if (window.pagefind) {
      // Already loaded correctly
      return;
    }

    // Try to load from the correct location
    const newScript = document.createElement("script");
    newScript.src = "/pagefind/pagefind.js";
    document.head.appendChild(newScript);
  };
  document.head.appendChild(script);

  // Export a dummy search function in case the real one fails to load
  window.pagefind = window.pagefind || {
    search: function (query) {
      console.warn("Using fallback pagefind search. The real pagefind.js failed to load.");
      return Promise.resolve({
        results: [],
      });
    },
  };
})();
