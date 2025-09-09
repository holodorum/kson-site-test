/**
 * Shared configuration and utilities for KSON Monaco editors
 */

/**
 * Extended type for MonacoEditorLanguageClientWrapper
 * Since the actual type definition is not available in the distributed build,
 * we define the interface based on the methods we use.
 */
export interface MonacoEditorLanguageClientWrapper {
  start(): void;
  dispose(): Promise<void>;
  getEditor(): {
    getValue(): string;
    setValue(value: string): void;
    getModel(): {
      onDidChangeContent(listener: () => void): void;
    } | null;
  };
}

/**
 * Extended HTMLPreElement interface for KSON code blocks.
 * This interface adds custom properties to track the Monaco editor instance,
 * output element for transpiled code, and format selector controls.
 * These properties are dynamically added to pre elements when they become interactive.
 */
export interface HTMLEditorElement extends HTMLPreElement {
  _ksonEditor?: MonacoEditorLanguageClientWrapper;
  _outputElement?: HTMLElement;
  _formatSelector?: FormatSelector;
  _dualEditor?: any;
}

export interface FormatSelector {
  container: HTMLElement;
  jsonRadio: HTMLInputElement;
  yamlRadio: HTMLInputElement;
}

/**
 * Base Monaco editor configuration shared between interactive and playground editors
 */
export const BASE_EDITOR_CONFIG = {
  'workbench.colorTheme': 'Default Dark+',
  'editor.lineNumbers': 'off',
  'editor.scrollBeyondLastLine': false,
  'editor.scrollBeyondLastColumn': 0,
  'editor.minimap.enabled': false,
  'editor.guides.bracketPairsHorizontal': 'active',
  'editor.wordBasedSuggestions': 'off',
};

/**
 * Interactive editor configuration (extends base config)
 */
export const INTERACTIVE_EDITOR_CONFIG = {
  ...BASE_EDITOR_CONFIG,
  'editor.fontSize': 14,
  'editor.padding': { top: 24, bottom: 24, left: 24, right: 24 },
  'editor.wordWrap': 'on',
  'editor.wordWrapColumn': 120,
  'editor.wrappingIndent': 'same',
  'editor.folding': false,
  'editor.foldingStrategy': 'indentation',
  'editor.showFoldingControls': 'never',
  'editor.foldingHighlight': false,
  'editor.foldingImportsByDefault': false,
  'editor.hover.enabled': true,
  'editor.hover.sticky': true,
  'editor.hover.above': false,
  'editor.fixedOverflowWidgets': true,
};

/**
 * Playground editor configuration (extends base config)
 */
export const PLAYGROUND_EDITOR_CONFIG = {
  ...BASE_EDITOR_CONFIG,
  'editor.fontSize': 16,
  'editor.padding': { top: 8, bottom: 8 },
  'editor.folding': false,
  'editor.wordWrap': 'on',
  'editor.wordWrapColumn': 120,
    'editor.hover.enabled': true,
  'editor.hover.sticky': true,
  'editor.hover.above': false,
  'editor.fixedOverflowWidgets': true,

};

/**
 * Create editor configuration object
 */
export function createEditorConfig(
  htmlContainer: HTMLElement,
  text: string,
  uri: string,
  editorSettings: Record<string, any> = INTERACTIVE_EDITOR_CONFIG
) {
  return {
    htmlContainer,
    editorAppConfig: {
      codeResources: {
        modified: {
          text,
          uri
        }
      }
    },
    vscodeApiConfig: {
      userConfiguration: {
        json: JSON.stringify(editorSettings)
      }
    }
  };
}

/**
 * Helper to safely update preview with error handling
 */
export function safeAsyncCall(asyncFn: () => Promise<void>): () => void {
  return () => {
    asyncFn().catch(console.error);
  };
}