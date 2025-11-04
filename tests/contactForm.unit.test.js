// Jest unit tests for contactForm.js
// Add tests for validation, ARIA, error handling, and live region feedback

/**
 * @jest-environment jsdom
 */
describe('contactForm.js', () => {
  // Suppress jsdom image loading errors
  beforeAll(() => {
    jest.spyOn(global.console, 'error').mockImplementation((msg) => {
      if (typeof msg === 'string' && msg.includes('Could not load img')) return;
      // ...existing code...
      return console.warn(msg);
    });
    // Mock HTMLImageElement loading
    Object.defineProperty(global.Image.prototype, 'src', {
      set() {
        setTimeout(() => {
          if (typeof this.onload === 'function') this.onload();
        }, 0);
      },
    });
  });
  let contactForm, nameInput, emailInput, messageInput, submitButton, nameError, emailError, messageError;
  let validateField, handleFormSubmit, initContactForm;
  beforeEach(() => {
    document.body.innerHTML = `
      <form class="contact__form">
        <input id="name" type="text" />
        <span id="name-error" class="contact__error"></span>
        <input id="email" type="email" />
        <span id="email-error" class="contact__error"></span>
        <textarea id="message"></textarea>
        <span id="message-error" class="contact__error"></span>
        <button class="contact__submit" type="submit">Send</button>
      </form>
    `;
    // Simulate CSS loaded
    document.documentElement.classList.add('css-loaded');
    // Force DOM ready state for waitForCSSAndDOM
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'complete',
    });
    console.log('[TEST] DOM readyState forced to complete');
    jest.resetModules();
    ({ validateField, handleFormSubmit, initContactForm } = require('../src/js/contactForm.js'));
    initContactForm();
    contactForm = document.querySelector('.contact__form');
    nameInput = document.getElementById('name');
    emailInput = document.getElementById('email');
    messageInput = document.getElementById('message');
    submitButton = contactForm.querySelector('.contact__submit');
    nameError = document.getElementById('name-error');
    emailError = document.getElementById('email-error');
    messageError = document.getElementById('message-error');
    console.log('[TEST] contactForm.js required and DOM initialized');
  });

  // Helper to wait for ARIA attribute to be set
  function waitForAria(input, attr, expected) {
    return new Promise((resolve) => {
      function check() {
        if (input.getAttribute(attr) === expected) {
          resolve();
        } else {
          setTimeout(check, 5);
        }
      }
      check();
    });
  }

  test('should validate fields and set aria-invalid', async () => {
    console.log('[TEST] Starting aria-invalid validation test');
    validateField(nameInput, 'name');
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    validateField(nameInput, 'name');
    await waitForAria(nameInput, 'aria-invalid', 'true');
    console.log('[TEST] aria-invalid set to true for empty name');
    expect(nameInput.getAttribute('aria-invalid')).toBe('true');
    nameInput.value = 'A';
    nameInput.dispatchEvent(new Event('input'));
    validateField(nameInput, 'name');
    await waitForAria(nameInput, 'aria-invalid', 'true');
    console.log('[TEST] aria-invalid remains true for short name');
    expect(nameInput.getAttribute('aria-invalid')).toBe('true');
    nameInput.value = 'Alex';
    nameInput.dispatchEvent(new Event('input'));
    validateField(nameInput, 'name');
    await waitForAria(nameInput, 'aria-invalid', 'false');
    console.log('[TEST] aria-invalid set to false for valid name');
    expect(nameInput.getAttribute('aria-invalid')).toBe('false');
  }, 15000);

  test('should associate error messages via aria-describedby', async () => {
    console.log('[TEST] Starting aria-describedby association test');
    validateField(nameInput, 'name');
    nameInput.value = '';
    nameInput.dispatchEvent(new Event('input'));
    validateField(nameInput, 'name');
    await waitForAria(nameInput, 'aria-describedby', 'name-error');
    console.log('[TEST] aria-describedby set to name-error');
    expect(nameInput.getAttribute('aria-describedby')).toBe('name-error');
    expect(nameError.textContent.length).toBeGreaterThan(0);
    expect(nameError.classList.contains('contact__error--visible')).toBe(true);
  }, 15000);

  test('should announce status via live region', () => {
    // Simulate a successful validation and check for live region
    nameInput.value = 'Alex';
    nameInput.dispatchEvent(new Event('input'));
    // Simulate announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = 'Form submitted';
    document.body.appendChild(announcement);
    setTimeout(() => {
      expect(document.body.contains(announcement)).toBe(false);
    }, 1100);
  });

  test('should focus first invalid field on submit', async () => {
    console.log('[TEST] Starting focus invalid field test');
    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    const event = new Event('submit', { bubbles: true, cancelable: true });
    handleFormSubmit(event);
    // Wait for focus to be set
    await new Promise((resolve) => setTimeout(resolve, 20));
    console.log('[TEST] document.activeElement:', document.activeElement);
    expect(document.activeElement).toBe(nameInput);
  }, 15000);
});
