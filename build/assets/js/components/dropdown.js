class Dropdown {
    constructor(toggleBtn, menuEl) {
      this.toggleBtn = toggleBtn;
      this.menu = menuEl;

      this.visible = false;

      this.outsideHandler = (e) => {
        if (!this.menu.contains(e.target) && !this.toggleBtn.contains(e.target)) {
          this.hide();
        }
      };
    }

    show() {
      this.menu.classList.add('show');
      document.addEventListener('click', this.outsideHandler);
      this.visible = true;
      
      // Adjust position for mobile view
      this.adjustPosition();
    }
    
    adjustPosition() {
      // Only on mobile, position fixed dropdowns correctly
      if (window.innerWidth < 768) {
        const rect = this.toggleBtn.getBoundingClientRect();
        this.menu.style.top = (rect.bottom + 5) + 'px';
        this.menu.style.right = '10px';
        this.menu.style.left = null;
        
        // For profile dropdown, adjust based on trigger position
        if (this.menu.id === 'profileDropdown') {
          this.menu.style.right = '10px';
        }
        
        // For notification dropdown, make it wider on mobile
        if (this.menu.id === 'notificationDropdown') {
          this.menu.style.width = 'calc(100vw - 20px)';
          this.menu.style.right = '10px';
        }
      } else {
        // Reset styles on desktop
        this.menu.style.top = null;
        if (this.menu.id === 'notificationDropdown') {
          this.menu.style.width = null;
        }
      }
    }

    hide() {
      this.menu.classList.remove('show');
      document.removeEventListener('click', this.outsideHandler);
      this.visible = false;
    }

    toggle() {
      this.visible ? this.hide() : this.show();
    }
  }

  const dropdownRegistry = new Map();

  function getDropdownInstance(trigger) {
    const target = trigger.getAttribute('data-tw-target');
    const menu = document.querySelector(target);
    if (!menu) return null;

    if (!dropdownRegistry.has(target)) {
      dropdownRegistry.set(target, new Dropdown(trigger, menu));
    }

    return dropdownRegistry.get(target);
  }

  // Window resize handler
  window.addEventListener('resize', () => {
    dropdownRegistry.forEach(dropdown => {
      if (dropdown.visible) {
        dropdown.adjustPosition();
      }
    });
  });
  
  // Attribute-based toggle
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-tw-toggle="dropdown"]');
    if (!trigger) return;

    e.preventDefault();

    const dropdown = getDropdownInstance(trigger);
    dropdown?.toggle();
  });

  // Global JS API
  window.twDropdown = {
    show: (selector) => {
      const btn = document.querySelector(`[data-tw-target="${selector}"]`);
      const dropdown = getDropdownInstance(btn);
      dropdown?.show();
    },
    hide: (selector) => {
      const btn = document.querySelector(`[data-tw-target="${selector}"]`);
      const dropdown = getDropdownInstance(btn);
      dropdown?.hide();
    },
    toggle: (selector) => {
      const btn = document.querySelector(`[data-tw-target="${selector}"]`);
      const dropdown = getDropdownInstance(btn);
      dropdown?.toggle();
    }
};