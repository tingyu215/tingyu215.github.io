/* Use block comments: production HTML compression removes line breaks. */
(function () {
  'use strict';

  var root = document.documentElement;
  var storageKey = 'tingyu-color-theme';
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  var preference = null;

  function validTheme(value) {
    return value === 'dark' || value === 'light' ? value : null;
  }

  try {
    preference = validTheme(window.localStorage.getItem(storageKey));
  } catch (error) {
    /* Switching still works when browser storage is unavailable. */
  }

  function preferredTheme() {
    return preference || (systemTheme.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    var dark = theme === 'dark';
    root.setAttribute('data-theme', theme);

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(dark));
      button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    });

    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.content = dark ? '#161b20' : '#ffffff';
    }
  }

  /* Run before the stylesheet and first paint, including on return visits. */
  applyTheme(preferredTheme());

  function initializeToggle() {
    applyTheme(preferredTheme());
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        preference = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        try {
          window.localStorage.setItem(storageKey, preference);
        } catch (error) {
          /* Keep the current-page choice even if it cannot be saved. */
        }
        applyTheme(preference);
      });
      button.hidden = false;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeToggle, { once: true });
  } else {
    initializeToggle();
  }

  function followSystemTheme() {
    if (!preference) applyTheme(preferredTheme());
  }

  if (systemTheme.addEventListener) {
    systemTheme.addEventListener('change', followSystemTheme);
  } else {
    systemTheme.addListener(followSystemTheme);
  }

  window.addEventListener('storage', function (event) {
    if (event.key === storageKey || event.key === null) {
      preference = validTheme(event.newValue);
      applyTheme(preferredTheme());
    }
  });
}());
