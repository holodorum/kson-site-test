/**
 * KSON Interactive Code Blocks
 * Loads examples and adds click-to-edit functionality with lazy loading of Monaco editor
 */

import {loadExampleContent} from './kson-utils.js';
import {
  MonacoEditorLanguageClientWrapper,
  HTMLEditorElement,
  INTERACTIVE_EDITOR_CONFIG,
  createEditorConfig,
  safeAsyncCall
} from './kson-editor-config.js';

(function() {
  'use strict';

  let monacoModule: any = null;
  let isMonacoLoading = false;

  /**
   * Load Monaco editor module and CSS
   */
  async function loadMonaco() {
    if (monacoModule || isMonacoLoading) {
      return monacoModule;
    }

    isMonacoLoading = true;

    try {
      // Load CSS if not already loaded
      const cssPath = '/vendor/monaco/kson-monaco.css';
      if (!document.querySelector(`link[href="${cssPath}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssPath;
        document.head.appendChild(link);
        
        await new Promise((resolve, reject) => {
          link.onload = resolve;
          link.onerror = () => reject(new Error(`Failed to load CSS: ${cssPath}`));
        });
      }

      // Load the module
      // @ts-ignore
      monacoModule = await import('/vendor/monaco/kson-monaco.js');
      isMonacoLoading = false;
      return monacoModule;
    } catch (error) {
      isMonacoLoading = false;
      throw error;
    }
  }

  /**
   * Get the active editor from any code block
   */
  function getActiveEditor(): { block: HTMLEditorElement; editor: MonacoEditorLanguageClientWrapper } | null {
    const blocks = document.querySelectorAll<HTMLEditorElement>('pre[data-editable="true"]');
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block._ksonEditor) {
        return { block, editor: block._ksonEditor };
      }
    }
    return null;
  }

  /**
   * Restore a code block to its original state
   */
  async function restoreBlock(block: HTMLEditorElement) {
    // Clear editor reference
    delete block._ksonEditor;
    
    // Restore original styles
    block.style.height = '';
    block.style.width = '';
    block.style.position = '';
    block.style.padding = '';
    block.removeAttribute('data-editor-active');
    
    // Reload content from example
    const exampleName = block.getAttribute('data-example');
    if (exampleName) {
      try {
        const examplePath = block.getAttribute('data-example-path');
        const response = await fetch(examplePath || `/examples/${exampleName}.html`);
        if (response.ok) {
          const htmlContent = await response.text();
          block.innerHTML = '<code>' + htmlContent + '</code>';
        } else {
          console.error(`Failed to load example: ${exampleName}`);
          block.innerHTML = '<code><!-- Failed to load example --></code>';
        }
      } catch (error) {
        console.error(`Failed to restore example ${exampleName}:`, error);
        block.innerHTML = '<code><!-- Failed to load example --></code>';
      }
    }
  }

  /**
   * Create an editor instance for a code block
   */
  async function createEditor(codeBlock: HTMLEditorElement) {
    // Get exact dimensions before any modifications
    const rect = codeBlock.getBoundingClientRect();
    const originalHeight = Math.max(rect.height, 200); // Ensure minimum height
    const originalWidth = rect.width;
    const exampleName = codeBlock.getAttribute('data-example');
    
    // Mark as editor active
    codeBlock.setAttribute('data-editor-active', 'true');

    try {
      // Load Monaco if needed
      if (!monacoModule) {
        await loadMonaco();
      }

      // Get content
      const content = await loadExampleContent(`/examples/${exampleName}.html`);

      // Dispose any existing editor
      const active = getActiveEditor();
      if (active) {
        await active.editor.dispose();
        await restoreBlock(active.block);
      }

      // Prepare the block for editor
      codeBlock.innerHTML = '';
      codeBlock.style.height = originalHeight + 'px';
      codeBlock.style.minHeight = originalHeight + 'px';
      codeBlock.style.width = originalWidth + 'px';
      codeBlock.style.position = 'relative';
      codeBlock.style.padding = '0';
      codeBlock.style.overflow = 'hidden';
      codeBlock.style.display = 'block';

      // Create the editor
      const editorConfig = createEditorConfig(
        codeBlock,
        content,
        `/workspace/${exampleName || 'untitled'}.kson`,
        INTERACTIVE_EDITOR_CONFIG
      );
      const editor = await monacoModule.createKsonEditor(editorConfig);

      editor.start();
      
      // Store editor reference on the block
      codeBlock._ksonEditor = editor;
      

    } catch (error) {
      console.error('Failed to create editor:', error);
      await restoreBlock(codeBlock);
    }
  }


  /**
   * Setup a code block - load example and make it interactive
   */
  async function setupCodeBlock(block: HTMLEditorElement) {
    const exampleName = block.getAttribute('data-example');
    const codeElement = block.querySelector('code');
    
    // First load the example content
    if (exampleName && codeElement) {
      try {
        const examplePath = block.getAttribute('data-example-path');
        const response = await fetch(examplePath || `/examples/${exampleName}.html`);
        if (response.ok) {
          codeElement.innerHTML = await response.text();
        } else {
          console.error(`Failed to load example: ${exampleName}`);
        }
      } catch (error) {
        console.error(`Error loading example ${exampleName}:`, error);
      }
    }

    // Then make it interactive if editable
    if (block.getAttribute('data-editable') === 'true') {
      // Find the parent .kson-editor container
      const editorContainer = block.closest('.kson-editor') as HTMLElement;

      block.style.cursor = 'pointer';
      block.style.transition = 'opacity 0.2s';
      
      block.addEventListener('mouseenter', () => {
        if (!block._ksonEditor) {
          block.style.opacity = '0.9';
        }
      });
      
      block.addEventListener('mouseleave', () => {
        block.style.opacity = '1';
      });

      block.addEventListener('click', () => {
        if (!block._ksonEditor) {
          createEditor(block);
        }
      });
    }
  }

  /**
   * Setup format toggle buttons
   */
  function setupFormatToggles() {
    const toggleButtons = document.querySelectorAll('.format-toggle-btn');
    const formatExamples = document.querySelectorAll('.format-example');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const format = button.getAttribute('data-format');
        
        // Update active button
        toggleButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update visible example
        formatExamples.forEach(example => {
          if (example.getAttribute('data-format') === format) {
            example.classList.add('active');
          } else {
            example.classList.remove('active');
          }
        });
      });
    });
  }

  /**
   * Initialize - load examples and setup interactive code blocks
   */
  async function init() {
    // Look for all pre elements with data-example attribute
    const codeBlocks = document.querySelectorAll<HTMLEditorElement>('pre[data-example]');
    
    // Setup all code blocks
    for (let i = 0; i < codeBlocks.length; i++) {
      const block = codeBlocks[i];
      await setupCodeBlock(block);
    }
    
    // Setup format toggle buttons
    setupFormatToggles();
    
    // Handle click outside to dispose active editor
    document.addEventListener('click', async (e) => {
      const active = getActiveEditor();
      if (active) {
        // Check if click is outside the active editor
        const editorContainer = active.block.closest('.kson-editor');
        if (editorContainer && !editorContainer.contains(e.target as Node)) {
          await active.editor.dispose();
          await restoreBlock(active.block);
        }
      }
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', async () => {
      const active = getActiveEditor();
      if (active && monacoModule) {
        await active.editor.dispose();
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeAsyncCall(init));
  } else {
    safeAsyncCall(init)();
  }

})();