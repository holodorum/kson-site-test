import { compileKson, loadExampleContent, debounce } from './kson-utils.js';
import { createEditorConfig, safeAsyncCall, PLAYGROUND_EDITOR_CONFIG } from './kson-editor-config.js';
//@ts-ignore
import { createKsonEditor, createYamlEditor } from '../vendor/monaco/kson-monaco.js';
document.addEventListener('DOMContentLoaded', async () => {
    // Set initial content to prevent layout shift
    const preInputEditor = document.getElementById('input-editor');
    const preOutputEditor = document.getElementById('output-editor');
    if (preInputEditor) {
        preInputEditor.textContent = 'Loading editor...';
    }
    if (preOutputEditor) {
        preOutputEditor.textContent = 'Loading editor...';
    }
    // Setup event listeners
    const inputEditor = document.getElementById('input-editor');
    const outputEditor = document.getElementById('output-editor');
    const jsonRadio = document.getElementById('json-radio');
    const yamlRadio = document.getElementById('yaml-radio');
    const exampleSelector = document.getElementById('example-selector');
    const outputLanguageLabel = document.getElementById('output-language-label');
    if (inputEditor) {
        await createEditor(inputEditor);
    }
    if (outputEditor) {
        await createEditor(outputEditor, '/workspace/playground.yaml');
    }
    // If both input and output editor are loaded we can start them at the same time
    if (inputEditor?._ksonEditor && outputEditor?._ksonEditor) {
        inputEditor._ksonEditor.start();
        outputEditor._ksonEditor.start();
        // The inputEditor monitors the onDidChangeContent
        inputEditor._ksonEditor.getEditor().getModel()?.onDidChangeContent(() => {
            debounceUpdatePreview();
        });
    }
    // Check URL parameters for example selection
    const urlParams = new URLSearchParams(window.location.search);
    const exampleParam = urlParams.get('example');
    // Load example based on URL parameter or default to fibonacci
    if (exampleSelector) {
        const defaultExample = exampleParam || 'fibonacci';
        exampleSelector.value = defaultExample;
        await loadExample(defaultExample);
    }
    // Initial preview update
    await updatePreview();
    async function createEditor(codeBlock, uri = '/workspace/playground.kson') {
        // Check if editor already exists
        if (codeBlock._ksonEditor) {
            console.log('Editor already exists for this block');
            return;
        }
        // Get exact dimensions before any modifications
        const rect = codeBlock.getBoundingClientRect();
        const originalHeight = Math.max(rect.height, 400); // Ensure minimum height for playground
        const originalWidth = rect.width;
        // Prepare the block for editor
        codeBlock.innerHTML = '';
        codeBlock.style.height = originalHeight + 'px';
        codeBlock.style.minHeight = originalHeight + 'px';
        codeBlock.style.width = originalWidth + 'px';
        codeBlock.style.position = 'relative';
        codeBlock.style.padding = '0';
        codeBlock.style.overflow = 'hidden';
        codeBlock.style.display = 'block';
        // Store editor reference on the block
        const sharedConfig = createEditorConfig(codeBlock, '', uri, PLAYGROUND_EDITOR_CONFIG);
        codeBlock._ksonEditor = uri.endsWith('.kson') ?
            await createKsonEditor(sharedConfig) : await createYamlEditor(sharedConfig);
    }
    function updateEditorContent(editor, content) {
        if (!editor)
            return;
        if (editor._ksonEditor) {
            const monacoEditor = editor._ksonEditor;
            monacoEditor.getEditor().setValue(content);
        }
    }
    // Debounced update preview function
    const debounceUpdatePreview = debounce(() => {
        updatePreview().catch(console.error);
    }, 200);
    // Function to update the preview based on selected format
    async function updatePreview() {
        if (!inputEditor?._ksonEditor || !outputEditor?._ksonEditor)
            return;
        const inputContent = inputEditor._ksonEditor.getEditor().getValue();
        if (!inputContent)
            return;
        const format = jsonRadio?.checked ? 'json' : 'yaml';
        // Update the output language label
        if (outputLanguageLabel) {
            outputLanguageLabel.textContent = format.toUpperCase();
        }
        const result = compileKson(inputContent, format);
        if (result.success && result.output) {
            updateEditorContent(outputEditor, result.output);
        }
        else {
            console.warn('Compilation failed:', result.error);
        }
    }
    // Add example content loading
    async function loadExample(exampleName) {
        if (!exampleName)
            return;
        const textContent = await loadExampleContent(`../playground/playground-examples/${exampleName}.kson`);
        if (textContent) {
            updateEditorContent(inputEditor, textContent);
        }
    }
    // Function to handle placeholder text
    function clearPlaceholder(editor) {
        const editorInstance = editor._ksonEditor;
        if (editorInstance) {
            const content = editorInstance.getEditor().getValue();
            if (content.includes('// Paste your JSON or KSON here') ||
                content.includes('// Your transformed output will appear here')) {
                editorInstance.getEditor().setValue('');
            }
        }
    }
    // Clear placeholder on focus
    inputEditor?.addEventListener('focusin', () => clearPlaceholder(inputEditor));
    // Event listeners
    jsonRadio?.addEventListener('change', safeAsyncCall(updatePreview));
    yamlRadio?.addEventListener('change', safeAsyncCall(updatePreview));
    exampleSelector?.addEventListener('change', (event) => {
        const selectedExample = event.target.value;
        if (selectedExample) {
            loadExample(selectedExample).then(() => {
                return updatePreview();
            }).catch(console.error);
        }
    });
});
//# sourceMappingURL=kson-playground.js.map