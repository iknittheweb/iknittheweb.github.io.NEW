// Jest unit tests for dropdown.js
// Add tests for toggling, keyboard, ARIA, and focus management

/**
 * @jest-environment jsdom
 */
describe('dropdown.js', () => {
  let dropdownTitleGroup, dropdownContent;
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="dropdown__title-group">Dropdown</div>
      <div class="dropdown__content">
        <a href="#">Item 1</a>
        <a href="#">Item 2</a>
      </div>
    `;
    // Simulate CSS loaded
    document.documentElement.classList.add('css-loaded');
    // Re-require the module to re-run its setup
    jest.resetModules();
    require('../src/js/dropdown.js');
    dropdownTitleGroup = document.querySelector('.dropdown__title-group');
    dropdownContent = document.querySelector('.dropdown__content');
  });

  // Helper to wait for ARIA attributes to be set
  function waitForDropdownInit() {
    return new Promise((resolve) => {
      function check() {
        if (dropdownTitleGroup.getAttribute('role') === 'button') {
          resolve();
        } else {
          setTimeout(check, 5);
        }
      }
      check();
    });
  }

  test('should set ARIA attributes on init', async () => {
    await waitForDropdownInit();
    expect(dropdownTitleGroup.getAttribute('role')).toBe('button');
    expect(dropdownTitleGroup.getAttribute('aria-controls')).toBe('dropdown-content');
    expect(dropdownTitleGroup.getAttribute('tabindex')).toBe('0');
    expect(dropdownContent.getAttribute('role')).toBe('menu');
    expect(dropdownContent.getAttribute('id')).toBe('dropdown-content');
    expect(dropdownContent.getAttribute('aria-labelledby')).toBe('dropdown-title-group');
    expect(dropdownContent.getAttribute('aria-hidden')).toBe('true');
  });

  test('should toggle dropdown open/close on click', async () => {
    await waitForDropdownInit();
    dropdownTitleGroup.click();
    expect(dropdownContent.classList.contains('show')).toBe(true);
    expect(dropdownContent.getAttribute('aria-hidden')).toBe('false');
    expect(dropdownTitleGroup.classList.contains('dropdown-open')).toBe(true);
    expect(dropdownTitleGroup.getAttribute('aria-expanded')).toBe('true');

    // Close
    dropdownTitleGroup.click();
    expect(dropdownContent.classList.contains('show')).toBe(false);
    expect(dropdownContent.getAttribute('aria-hidden')).toBe('true');
    expect(dropdownTitleGroup.classList.contains('dropdown-open')).toBe(false);
    expect(dropdownTitleGroup.getAttribute('aria-expanded')).toBe('false');
  });

  test('should handle keyboard events (Enter, Space, Escape)', async () => {
    await waitForDropdownInit();
    // Open with Enter
    dropdownTitleGroup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(dropdownContent.classList.contains('show')).toBe(true);
    // Close with Escape
    dropdownTitleGroup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(dropdownContent.classList.contains('show')).toBe(false);
    // Open with Space
    dropdownTitleGroup.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    expect(dropdownContent.classList.contains('show')).toBe(true);
  });

  test('should trap focus when open', async () => {
    await waitForDropdownInit();
    dropdownTitleGroup.click();
    // Simulate tabbing into dropdown
    const firstLink = dropdownContent.querySelector('a');
    firstLink.focus();
    expect(document.activeElement).toBe(firstLink);
    // Simulate closing and returning focus
    dropdownTitleGroup.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(document.activeElement).toBe(dropdownTitleGroup);
  });
});
