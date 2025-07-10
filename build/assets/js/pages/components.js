document.addEventListener('DOMContentLoaded', function() {
    hljs.highlightAll();
    
    // Add language classes to code blocks if they don't have them
    document.querySelectorAll('pre code').forEach((block) => {
        if (!block.classList.contains('language-html') && 
            !block.classList.contains('language-javascript')) {
            if (block.textContent.includes('<!') || 
                block.textContent.includes('<div') || 
                block.textContent.includes('<span')) {
                block.classList.add('language-html');
            } else if (block.textContent.includes('function') || 
                        block.textContent.includes('const ') || 
                        block.textContent.includes('document.')) {
                block.classList.add('language-javascript');
            }
        }
        hljs.highlightElement(block);
    });
});