// Mock window.matchMedia for navigation tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock TextEncoder for jsdom
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder;
}

// Mock TextDecoder for jsdom
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = require('util').TextDecoder;
}

// Mock IntersectionObserver for skillsChart tests
global.IntersectionObserver = class {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock HTMLFormElement.prototype.requestSubmit for contactForm tests
if (typeof HTMLFormElement !== 'undefined' && !HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function () {
    // Simulate form submit
    if (typeof this.submit === 'function') {
      this.submit();
    }
  };
}

// Mock body-scroll-lock functions for navigation tests and others
global.disableBodyScroll = jest.fn();
global.enableBodyScroll = jest.fn();
