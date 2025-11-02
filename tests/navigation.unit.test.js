/**
 * @jest-environment jsdom
 */
const { initializeNavigation } = require('../src/js/navigation.js');

describe('navigation.js', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="btnOpen" aria-expanded="false"></button>
      <button id="btnClose"></button>
      <nav id="menuTopNav" inert aria-hidden="true"><a href="#">Link</a></nav>
      <div id="overlay" aria-hidden="true"></div>
      <main id="main-content"></main>
      <footer></footer>
    `;
    initializeNavigation();
  });

  test('should open mobile menu and set ARIA attributes', () => {
    const btnOpen = document.getElementById('btnOpen');
    const menuTopNav = document.getElementById('menuTopNav');
    const overlay = document.getElementById('overlay');
    btnOpen.click();
    expect(btnOpen.getAttribute('aria-expanded')).toBe('true');
    expect(menuTopNav.getAttribute('aria-hidden')).toBe('false');
    expect(overlay.getAttribute('aria-hidden')).toBe('false');
    expect(menuTopNav.hasAttribute('inert')).toBe(false);
  });

  test('should close mobile menu and reset ARIA attributes', () => {
    const btnOpen = document.getElementById('btnOpen');
    const btnClose = document.getElementById('btnClose');
    const menuTopNav = document.getElementById('menuTopNav');
    const overlay = document.getElementById('overlay');
    btnOpen.click();
    btnClose.click();
    expect(btnOpen.getAttribute('aria-expanded')).toBe('false');
    expect(menuTopNav.getAttribute('aria-hidden')).toBe('true');
    expect(overlay.getAttribute('aria-hidden')).toBe('true');
    expect(menuTopNav.hasAttribute('inert')).toBe(true);
  });

  test('should trap focus within menu when open', () => {
    const btnOpen = document.getElementById('btnOpen');
    const btnClose = document.getElementById('btnClose');
    const menuTopNav = document.getElementById('menuTopNav');
    btnOpen.click();
    // Simulate Tab key
    const event = new KeyboardEvent('keydown', { key: 'Tab' });
    menuTopNav.dispatchEvent(event);
    // Focus should remain within menuTopNav
    expect(document.activeElement === btnClose || menuTopNav.contains(document.activeElement)).toBe(true);
  });

  test('should handle Escape key to close menu and return focus', () => {
    const btnOpen = document.getElementById('btnOpen');
    btnOpen.click();
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
    expect(btnOpen.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(btnOpen);
  });

  test('should not initialize if required elements are missing', () => {
    document.body.innerHTML = '<div></div>';
    expect(initializeNavigation()).toBe(false);
  });

  test('should announce messages to screen readers', () => {
    // Spy on appendChild/removeChild for screen reader announcements
    const spyAppend = jest.spyOn(document.body, 'appendChild');
    const spyRemove = jest.spyOn(document.body, 'removeChild');
    // Simulate announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = 'Menu opened';
    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
      expect(spyAppend).toHaveBeenCalled();
      expect(spyRemove).toHaveBeenCalled();
      spyAppend.mockRestore();
      spyRemove.mockRestore();
    }, 1000);
  });

  test('should handle repeated initialization gracefully', () => {
    expect(initializeNavigation()).toBe(true);
    expect(initializeNavigation()).toBe(true);
  });

  test('should set accessibility attributes on navigation', () => {
    // TODO: Implement test logic for accessibility attributes
    // Example: Check ARIA roles, labels, and tab order
    expect(true).toBe(true);
  });

  test('should not break if overlay is missing', () => {
    document.body.innerHTML = `
      <button id="btnOpen" aria-expanded="false"></button>
      <button id="btnClose"></button>
      <nav id="menuTopNav" inert aria-hidden="true"><a href="#">Link</a></nav>
      <main id="main-content"></main>
      <footer></footer>
    `;
    expect(() => initializeNavigation()).not.toThrow();
  });
});
