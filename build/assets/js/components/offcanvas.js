class TwOffcanvas {
  constructor(el) {
    this.el = el;
    this.isOpen = false;
    this._bindCloseButtons();
  }

  _bindCloseButtons() {
    this.el.querySelectorAll('[data-tw-dismiss="offcanvas"]').forEach(btn => {
      btn.addEventListener('click', () => this.hide());
    });
  }

  _createBackdrop() {
    if (document.querySelector('.offcanvas-backdrop')) return;

    const backdrop = document.createElement('div');
    backdrop.className = 'offcanvas-backdrop fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 opacity-0';
    document.body.appendChild(backdrop);

    // Force reflow for animation
    requestAnimationFrame(() => {
      backdrop.classList.add('opacity-30');
    });

    backdrop.addEventListener('click', () => this.hide());
    this.backdrop = backdrop;
  }

  _removeBackdrop() {
    if (!this.backdrop) return;
    this.backdrop.classList.remove('opacity-100');
    this.backdrop.classList.add('opacity-0');
    setTimeout(() => {
      if (this.backdrop?.parentNode) {
        this.backdrop.remove();
        this.backdrop = null;
      }
    }, 300);
  }

  show() {
    this._createBackdrop();
    this.el.classList.remove('hidden');

    // Force reflow before adding show class to trigger entrance transition
    requestAnimationFrame(() => {
      this.el.classList.add('offcanvas-show');
    });

    this.isOpen = true;
  }

  hide() {
    this.el.classList.remove('offcanvas-show');
    setTimeout(() => this.el.classList.add('hidden'), 300);
    this._removeBackdrop();
    this.isOpen = false;
  }

  toggle() {
    this.isOpen ? this.hide() : this.show();
  }
}

// Data API
document.querySelectorAll('[data-tw-toggle="offcanvas"]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const selector = trigger.getAttribute('data-tw-target');
    const target = document.querySelector(selector);
    if (!target) return;

    if (!target._twOffcanvas) {
      target._twOffcanvas = new TwOffcanvas(target);
    }

    target._twOffcanvas.toggle();
  });
});

// JS API
window.TwOffcanvas = {
  getInstance(elOrId) {
    const el = typeof elOrId === 'string' ? document.querySelector(elOrId) : elOrId;
    if (!el) return null;
    if (!el._twOffcanvas) el._twOffcanvas = new TwOffcanvas(el);
    return el._twOffcanvas;
  }
};
