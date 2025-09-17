/**
 * Shared configuration and utilities for KSON Monaco editors
 */
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
export function createEditorConfig(htmlContainer, text, uri, editorSettings = INTERACTIVE_EDITOR_CONFIG) {
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
export function safeAsyncCall(asyncFn) {
    return () => {
        asyncFn().catch(console.error);
    };
}
//# sourceMappingURL=kson-editor-config.js.map