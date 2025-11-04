// dropdown.js
// Handles dropdown menu logic for portfolio and other sections
// dropdown.js (ES module)
function waitForCSSAndDOM(callback) {
  function checkReady() {
    const domReady = document.readyState === 'complete' || document.readyState === 'interactive';
    const cssReady = document.documentElement.classList.contains('css-loaded') || window.mainCSSLoaded;
    if (domReady && cssReady) {
      requestAnimationFrame(() => {
        requestAnimationFrame(callback);
      });
    } else {
      requestAnimationFrame(checkReady);
    }
  }
  checkReady();
}

waitForCSSAndDOM(function () {
  const dropdownTitleGroup = document.querySelector('.dropdown__title-group');
  const dropdownContent = document.querySelector('.dropdown__content');
  if (dropdownTitleGroup && dropdownContent) {
    // ARIA roles and relationships
    dropdownTitleGroup.setAttribute('role', 'button');
    dropdownTitleGroup.setAttribute('aria-controls', 'dropdown-content');
    dropdownTitleGroup.setAttribute('tabindex', '0');
    dropdownTitleGroup.setAttribute('id', 'dropdown-title-group');
    dropdownContent.setAttribute('role', 'menu');
    dropdownContent.setAttribute('id', 'dropdown-content');
    dropdownContent.setAttribute('aria-labelledby', 'dropdown-title-group');
    dropdownContent.setAttribute('aria-hidden', 'true');

    let lastTrigger = null;

    dropdownTitleGroup.addEventListener('click', function () {
      toggleDropdown();
    });
    dropdownTitleGroup.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleDropdown();
      }
      if (e.key === 'Escape') {
        closeDropdown();
      }
      // Arrow key navigation for dropdown menu
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && dropdownContent.classList.contains('show')) {
        e.preventDefault();
        const items = dropdownContent.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        if (items.length) {
          if (e.key === 'ArrowDown') {
            items[0].focus();
          } else {
            items[items.length - 1].focus();
          }
        }
      }
    });
    function toggleDropdown() {
      const isOpen = dropdownContent.classList.contains('show');
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    }
    function openDropdown() {
      dropdownContent.classList.add('show');
      dropdownContent.setAttribute('aria-hidden', 'false');
      dropdownTitleGroup.classList.add('dropdown-open');
      dropdownTitleGroup.setAttribute('aria-expanded', 'true');
      lastTrigger = dropdownTitleGroup;
      trapFocus(dropdownContent, closeDropdown);
      // Focus first item for keyboard users
      setTimeout(() => {
        const items = dropdownContent.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        if (items.length) items[0].focus();
      }, 10);
    }
    function closeDropdown() {
      dropdownContent.classList.remove('show');
      dropdownContent.setAttribute('aria-hidden', 'true');
      dropdownTitleGroup.classList.remove('dropdown-open');
      dropdownTitleGroup.setAttribute('aria-expanded', 'false');
      if (lastTrigger) lastTrigger.focus();
    }
  }

  // Trap focus within dropdown menu
  function trapFocus(container, onClose) {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    const focusableEls = container.querySelectorAll(focusableSelectors.join(','));
    if (!focusableEls.length) return;
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    function focusHandler(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
      if (e.key === 'Escape') {
        if (typeof onClose === 'function') onClose();
      }
      // Arrow key navigation inside dropdown
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const items = Array.from(container.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])'));
        const idx = items.indexOf(document.activeElement);
        if (items.length) {
          let nextIdx = idx;
          if (e.key === 'ArrowDown') {
            nextIdx = (idx + 1) % items.length;
          } else if (e.key === 'ArrowUp') {
            nextIdx = (idx - 1 + items.length) % items.length;
          }
          items[nextIdx].focus();
          e.preventDefault();
        }
      }
    }
    container.addEventListener('keydown', focusHandler);
    container.dataset.focusTrap = 'true';
    // Remove trap on close
    function cleanupTrap() {
      container.removeEventListener('keydown', focusHandler);
      delete container.dataset.focusTrap;
    }
    const observer = new MutationObserver(() => {
      if (container.getAttribute('aria-hidden') === 'true') {
        cleanupTrap();
        observer.disconnect();
      }
    });
    observer.observe(container, { attributes: true });
  }
});
