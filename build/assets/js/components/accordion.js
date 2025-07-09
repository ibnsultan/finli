/**
 * TwAccordion - A lightweight, accessible accordion component for Tailwind CSS
 * 
 * Features:
 * - Keyboard accessibility (Space/Enter to toggle, Arrow keys for navigation)
 * - ARIA attributes for screen readers
 * - Multiple open items option
 * - Custom icons support
 * - Event hooks for open/close events
 */

const TwAccordion = (() => {
    // Store all initialized accordions
    const instances = new Map();
    
    /**
     * Initialize all accordions on the page
     */
    function init() {
        document.querySelectorAll('.accordion').forEach(accordion => {
            if (!instances.has(accordion)) {
                createInstance(accordion);
            }
        });
    }
    
    /**
     * Create a new accordion instance
     * @param {HTMLElement} accordionEl - The accordion container element
     * @returns {Object} - The accordion instance
     */
    function createInstance(accordionEl) {
        const id = accordionEl.id || `accordion-${Math.floor(Math.random() * 1000)}`;
        const allowMultiple = accordionEl.dataset.allowMultiple === 'true';
        const items = Array.from(accordionEl.querySelectorAll('.accordion-item'));
        
        // Initialize each accordion item
        items.forEach((item, index) => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const body = item.querySelector('.accordion-body');
            
            // Skip if any required element is missing
            if (!header || !content || !body) return;
            
            // Add ARIA attributes for accessibility
            header.setAttribute('id', `${id}-header-${index}`);
            header.setAttribute('aria-expanded', 'false');
            header.setAttribute('aria-controls', `${id}-content-${index}`);
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            
            content.setAttribute('id', `${id}-content-${index}`);
            content.setAttribute('role', 'region');
            content.setAttribute('aria-labelledby', `${id}-header-${index}`);
            content.setAttribute('hidden', '');
            
            // Initialize content height to 0
            content.style.maxHeight = '0px';
            
            // Add click event listener to header
            header.addEventListener('click', () => {
                toggleItem(accordionEl, index);
            });
            
            // Add keyboard support
            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleItem(accordionEl, index);
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    focusNextItem(items, index);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    focusPrevItem(items, index);
                } else if (e.key === 'Home') {
                    e.preventDefault();
                    items[0].querySelector('.accordion-header').focus();
                } else if (e.key === 'End') {
                    e.preventDefault();
                    items[items.length - 1].querySelector('.accordion-header').focus();
                }
            });
        });
        
        // Store the instance
        const instance = {
            element: accordionEl,
            id,
            items,
            allowMultiple,
            open: (index) => openItem(accordionEl, index),
            close: (index) => closeItem(accordionEl, index),
            toggle: (index) => toggleItem(accordionEl, index),
            openAll: () => openAllItems(accordionEl),
            closeAll: () => closeAllItems(accordionEl)
        };
        
        instances.set(accordionEl, instance);
        return instance;
    }
    
    /**
     * Toggle an accordion item
     * @param {HTMLElement} accordionEl - The accordion container element
     * @param {number} index - The index of the item to toggle
     */
    function toggleItem(accordionEl, index) {
        const instance = instances.get(accordionEl);
        if (!instance) return;
        
        const item = instance.items[index];
        if (!item) return;
        
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const body = item.querySelector('.accordion-body');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            // Close the item
            closeItem(accordionEl, index);
        } else {
            // If not allowing multiple open items, close all other items
            if (!instance.allowMultiple) {
                closeAllItems(accordionEl);
            }
            
            // Open this item
            openItem(accordionEl, index);
        }
    }
    
    /**
     * Open an accordion item
     * @param {HTMLElement} accordionEl - The accordion container element
     * @param {number} index - The index of the item to open
     */
    function openItem(accordionEl, index) {
        const instance = instances.get(accordionEl);
        if (!instance) return;
        
        const item = instance.items[index];
        if (!item) return;
        
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const body = item.querySelector('.accordion-body');
        
        // Update ARIA attributes
        header.setAttribute('aria-expanded', 'true');
        content.removeAttribute('hidden');
        
        // Set the content height to its scrollHeight
        content.style.maxHeight = `${body.offsetHeight}px`;
        
        // Handle custom icons if present
        const openIcon = item.querySelector('.accordion-icon-open');
        const closedIcon = item.querySelector('.accordion-icon-closed');
        
        if (openIcon && closedIcon) {
            openIcon.classList.remove('hidden');
            closedIcon.classList.add('hidden');
        }
        
        // Dispatch open event
        const event = new CustomEvent('accordion:open', {
            bubbles: true,
            detail: { index, item }
        });
        accordionEl.dispatchEvent(event);
    }
    
    /**
     * Close an accordion item
     * @param {HTMLElement} accordionEl - The accordion container element
     * @param {number} index - The index of the item to close
     */
    function closeItem(accordionEl, index) {
        const instance = instances.get(accordionEl);
        if (!instance) return;
        
        const item = instance.items[index];
        if (!item) return;
        
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        // Update ARIA attributes
        header.setAttribute('aria-expanded', 'false');
        content.setAttribute('hidden', '');
        
        // Reset content height
        content.style.maxHeight = '0px';
        
        // Handle custom icons if present
        const openIcon = item.querySelector('.accordion-icon-open');
        const closedIcon = item.querySelector('.accordion-icon-closed');
        
        if (openIcon && closedIcon) {
            openIcon.classList.add('hidden');
            closedIcon.classList.remove('hidden');
        }
        
        // Dispatch close event
        const event = new CustomEvent('accordion:close', {
            bubbles: true,
            detail: { index, item }
        });
        accordionEl.dispatchEvent(event);
    }
    
    /**
     * Open all accordion items
     * @param {HTMLElement} accordionEl - The accordion container element
     */
    function openAllItems(accordionEl) {
        const instance = instances.get(accordionEl);
        if (!instance || !instance.allowMultiple) return;
        
        instance.items.forEach((_, index) => {
            openItem(accordionEl, index);
        });
    }
    
    /**
     * Close all accordion items
     * @param {HTMLElement} accordionEl - The accordion container element
     */
    function closeAllItems(accordionEl) {
        const instance = instances.get(accordionEl);
        if (!instance) return;
        
        instance.items.forEach((_, index) => {
            closeItem(accordionEl, index);
        });
    }
    
    /**
     * Focus the next accordion header
     * @param {Array} items - Array of accordion items
     * @param {number} currentIndex - The current focused index
     */
    function focusNextItem(items, currentIndex) {
        const nextIndex = (currentIndex + 1) % items.length;
        items[nextIndex].querySelector('.accordion-header').focus();
    }
    
    /**
     * Focus the previous accordion header
     * @param {Array} items - Array of accordion items
     * @param {number} currentIndex - The current focused index
     */
    function focusPrevItem(items, currentIndex) {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        items[prevIndex].querySelector('.accordion-header').focus();
    }
    
    /**
     * Get an accordion instance by selector
     * @param {string|HTMLElement} selector - The accordion selector or element
     * @returns {Object|null} - The accordion instance or null if not found
     */
    function getInstance(selector) {
        const el = typeof selector === 'string' 
            ? document.querySelector(selector) 
            : selector;
            
        return el ? instances.get(el) : null;
    }
    
    // Initialize accordions when the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', init);
    
    // Public API
    return {
        init,
        getInstance,
        openItem,
        closeItem,
        toggleItem,
        openAllItems,
        closeAllItems
    };
})();

// Initialize accordions when the script loads
document.addEventListener('DOMContentLoaded', function() {
    TwAccordion.init();
    
    // Handle custom demo functionality if needed
    document.querySelectorAll('.accordion-demo-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.target;
            const action = this.dataset.action;
            const index = parseInt(this.dataset.index || 0);
            
            const accordion = TwAccordion.getInstance(target);
            if (accordion && action) {
                switch(action) {
                    case 'open':
                        accordion.open(index);
                        break;
                    case 'close':
                        accordion.close(index);
                        break;
                    case 'toggle':
                        accordion.toggle(index);
                        break;
                    case 'openAll':
                        accordion.openAll();
                        break;
                    case 'closeAll':
                        accordion.closeAll();
                        break;
                }
            }
        });
    });
});
