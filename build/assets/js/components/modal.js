class TwModal {
    constructor(modalEl) {
      this.modal = modalEl;
      this.dialog = modalEl.querySelector('.modal-dialog');
      this.isOpen = false;
      
      // Initialize
      this._bindCloseButtons();
      this._bindDismissButtons();
    }

    _bindCloseButtons() {
      // Close on [X] button
      const closeBtn = this.modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.hide());
      }
    }

    _bindDismissButtons() {
      // Close on dismiss buttons
      const dismissButtons = this.modal.querySelectorAll('[data-tw-dismiss="modal"]');
      if (dismissButtons) {
        dismissButtons.forEach(btn => {
          btn.addEventListener('click', () => this.hide());
        });
      }

      // Close on outside click
      this.modal.addEventListener('click', (e) => {
        if (!this.dialog.contains(e.target)) this.hide();
      });
    }

    _dispatchEvent(eventName) {
      const event = new CustomEvent(`modal:${eventName}`, { 
        bubbles: true,
        detail: { modal: this }
      });
      this.modal.dispatchEvent(event);
    }

    show() {
      if (this.isOpen) return;
      
      // Dispatch before show event
      this._dispatchEvent('beforeShow');

      // Show the modal
      document.body.classList.add('modal-open');
      this.modal.classList.remove('hidden');
      
      // Force reflow for animation
      void this.modal.offsetWidth;
      
      this.modal.classList.add('modal-show');
      this.isOpen = true;
      
      // Dispatch after show event
      this._dispatchEvent('show');
    }

    hide() {
      if (!this.isOpen) return;
      
      // Dispatch before hide event
      this._dispatchEvent('beforeHide');

      // Hide the modal
      this.modal.classList.remove('modal-show');
      
      // Wait for animation to finish
      setTimeout(() => {
        this.modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        this.isOpen = false;
        
        // Dispatch after hide event
        this._dispatchEvent('hide');
      }, 300);
    }

    toggle() {
      if (this.isOpen) {
        this.hide();
      } else {
        this.show();
      }
    }
  }

  // Registry of modal instances
  const modalRegistry = {};

  function getModalInstance(selector) {
    const modal = document.querySelector(selector);
    if (!modal) return null;
    if (!modalRegistry[selector]) {
      modalRegistry[selector] = new TwModal(modal);
    }
    return modalRegistry[selector];
  }

  // Attribute trigger support
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-tw-toggle="modal"]');
    if (!trigger) return;
    const target = trigger.getAttribute('data-tw-target');
    getModalInstance(target)?.show();
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Find any open modal and close it
      document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
        const instance = modalRegistry[`#${modal.id}`];
        if (instance) instance.hide();
      });
    }
  });
  
  // JS API
  window.twModal = {
    show: (selector) => getModalInstance(selector)?.show(),
    hide: (selector) => getModalInstance(selector)?.hide(),
    toggle: (selector) => getModalInstance(selector)?.toggle()
  };
  
  // Add to global scope for programmatic access
  window.TwModal = TwModal;