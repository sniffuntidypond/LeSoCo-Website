// Apple-Style Mega-Menu Dropdown Interaction
(function () {
  function initDropdown() {
    const header = document.querySelector('header.apple-nav');
    const btn = document.getElementById('featuresNavBtn');
    const menu = document.getElementById('appleFeaturesDropdown');
    const backdrop = document.getElementById('appleDropdownBackdrop');
    if (!header || !btn || !menu) return;

    let closeTimer = null;

    function openDropdown() {
      clearTimeout(closeTimer);
      document.body.classList.add('dropdown-open');
      header.classList.add('dropdown-open');
      btn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      clearTimeout(closeTimer);
      document.body.classList.remove('dropdown-open');
      header.classList.remove('dropdown-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    function scheduleClose() {
      closeTimer = setTimeout(closeDropdown, 160);
    }

    // Hover triggers (Apple-style smooth hover)
    btn.addEventListener('mouseenter', openDropdown);
    btn.addEventListener('mouseleave', scheduleClose);

    menu.addEventListener('mouseenter', openDropdown);
    menu.addEventListener('mouseleave', scheduleClose);

    // Click / Touch toggle
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (document.body.classList.contains('dropdown-open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Clicking backdrop closes menu
    if (backdrop) {
      backdrop.addEventListener('click', closeDropdown);
    }

    // Clicking outside header closes menu
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        closeDropdown();
      }
    });

    // Escape key closes menu
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('dropdown-open')) {
        closeDropdown();
        btn.focus();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDropdown);
  } else {
    initDropdown();
  }
})();
