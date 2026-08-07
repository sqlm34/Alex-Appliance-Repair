(function () {
  'use strict';

  const filterRoot = document.querySelector('[data-recent-work-filters]');
  const cards = Array.from(document.querySelectorAll('[data-work-card]'));
  const count = document.querySelector('[data-recent-work-count]');
  const empty = document.querySelector('[data-recent-work-empty]');

  if (!filterRoot || !cards.length) return;

  const state = {
    city: 'all',
    appliance: 'all'
  };

  function updateButtons(group, value) {
    filterRoot.querySelectorAll(`[data-filter-group="${group}"]`).forEach(function (button) {
      const active = button.dataset.filterValue === value;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyFilters() {
    let visible = 0;

    cards.forEach(function (card) {
      const cityMatch = state.city === 'all' || card.dataset.city === state.city;
      const applianceMatch = state.appliance === 'all' || card.dataset.appliance === state.appliance;
      const show = cityMatch && applianceMatch;

      card.hidden = !show;
      if (show) visible += 1;
    });

    if (count) {
      count.textContent = visible + (visible === 1 ? ' documented repair' : ' documented repairs');
    }

    if (empty) {
      empty.hidden = visible !== 0;
    }
  }

  filterRoot.addEventListener('click', function (event) {
    const button = event.target.closest('[data-filter-group][data-filter-value]');
    if (!button) return;

    const group = button.dataset.filterGroup;
    const value = button.dataset.filterValue;

    if (!Object.prototype.hasOwnProperty.call(state, group)) return;

    state[group] = value;
    updateButtons(group, value);
    applyFilters();
  });

  applyFilters();
}());
