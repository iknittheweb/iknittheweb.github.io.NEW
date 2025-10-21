// Jest unit tests for skillsChart.js
// Add tests for tab navigation, ARIA, and progressbar attributes

/**
 * @jest-environment jsdom
 */
describe('skillsChart.js', () => {
  let skillsChart, tabs, categories, progressBars;
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="skills-chart">
        <button class="skills-chart__tab skills-chart__tab--active"><span class="skills-chart__tab-text">Tab 1</span></button>
        <button class="skills-chart__tab"><span class="skills-chart__tab-text">Tab 2</span></button>
        <div class="skills-chart__category skills-chart__category--active">
          <div class="skills-chart__progress-bar">
            <div class="skills-chart__progress-fill" data-level="80"></div>
          </div>
        </div>
        <div class="skills-chart__category">
          <div class="skills-chart__progress-bar">
            <div class="skills-chart__progress-fill" data-level="60"></div>
          </div>
        </div>
      </div>
    `;
    // Re-require the module to re-run its setup
    jest.resetModules();
    require('../src/js/skillsChart.js');
    skillsChart = document.getElementById('skills-chart');
    tabs = skillsChart.querySelectorAll('.skills-chart__tab');
    categories = skillsChart.querySelectorAll('.skills-chart__category');
    progressBars = skillsChart.querySelectorAll('.skills-chart__progress-bar');
  });

  test('should set ARIA roles and attributes on init', () => {
    expect(skillsChart.getAttribute('role')).toBe('tablist');
    tabs.forEach((tab, i) => {
      expect(tab.getAttribute('role')).toBe('tab');
      expect(tab.getAttribute('aria-controls')).toBe(`skills-category-${i}`);
      expect(tab.getAttribute('aria-selected')).toMatch(/true|false/);
      expect(tab.getAttribute('tabindex')).toMatch(/0|-1/);
    });
    categories.forEach((cat, i) => {
      expect(cat.getAttribute('role')).toBe('tabpanel');
      expect(cat.getAttribute('id')).toBe(`skills-category-${i}`);
      expect(cat.getAttribute('aria-labelledby')).toMatch(/skills-tab-\d+/);
    });
  });

  test('should toggle tabs and update ARIA attributes', () => {
    // Tab 2 should not be active
    expect(tabs[1].classList.contains('skills-chart__tab--active')).toBe(false);
    tabs[1].click();
    expect(tabs[1].classList.contains('skills-chart__tab--active')).toBe(true);
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(tabs[1].getAttribute('tabindex')).toBe('0');
    expect(categories[1].classList.contains('skills-chart__category--active')).toBe(true);
    expect(categories[1].getAttribute('aria-hidden')).toBe('false');
    // Tab 1 should be inactive
    expect(tabs[0].classList.contains('skills-chart__tab--active')).toBe(false);
    expect(tabs[0].getAttribute('aria-selected')).toBe('false');
    expect(tabs[0].getAttribute('tabindex')).toBe('-1');
    expect(categories[0].classList.contains('skills-chart__category--active')).toBe(false);
    expect(categories[0].getAttribute('aria-hidden')).toBe('true');
  });

  test('should handle arrow key navigation between tabs', () => {
    // ArrowRight from Tab 1 to Tab 2
    tabs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(document.activeElement).toBe(tabs[1]);
    expect(tabs[1].classList.contains('skills-chart__tab--active')).toBe(true);
    // ArrowLeft from Tab 2 to Tab 1
    tabs[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(document.activeElement).toBe(tabs[0]);
    expect(tabs[0].classList.contains('skills-chart__tab--active')).toBe(true);
  });

  test('should set correct progressbar ARIA attributes', () => {
    progressBars.forEach((bar) => {
      expect(bar.getAttribute('role')).toBe('progressbar');
      expect(bar.getAttribute('aria-valuemin')).toBe('0');
      expect(bar.getAttribute('aria-valuemax')).toBe('100');
      const fill = bar.querySelector('.skills-chart__progress-fill');
      expect(bar.getAttribute('aria-valuenow')).toBe(fill.getAttribute('data-level'));
    });
  });
});
