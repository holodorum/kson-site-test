import { loadExampleContent, debounce } from './kson-utils.js';
import { parseSchema, validateDocument, formatValidationErrors } from './kson-schema-validator.js';
import { createEditorConfig, PLAYGROUND_EDITOR_CONFIG } from './kson-editor-config.js';
//@ts-ignore
import { createKsonEditor } from '../vendor/monaco/kson-monaco.js';
let currentValidator = null;
let globalLspStarted = false; // Track if any LSP has been started
document.addEventListener('DOMContentLoaded', async () => {
    // Set initial content to prevent layout shift
    const preSchemaEditor = document.getElementById('schema-editor');
    const preDocumentEditor = document.getElementById('document-editor');
    if (preSchemaEditor) {
        preSchemaEditor.textContent = 'Loading editor...';
    }
    if (preDocumentEditor) {
        preDocumentEditor.textContent = 'Loading editor...';
    }
    // Setup event listeners
    const schemaEditor = document.getElementById('schema-editor');
    const documentEditor = document.getElementById('document-editor');
    const schemaExampleSelector = document.getElementById('schema-example-selector');
    const documentExampleSelector = document.getElementById('document-example-selector');
    const validationResults = document.getElementById('validation-results');
    if (schemaEditor) {
        await createEditor(schemaEditor, '/workspace/schema.kson');
    }
    if (documentEditor) {
        await createEditor(documentEditor, '/workspace/document.kson');
    }
    // Start only the first editor's LSP to avoid duplicate command registration
    if (schemaEditor?._ksonEditor && documentEditor?._ksonEditor) {
        if (!globalLspStarted) {
            // Start only the schema editor's LSP
            schemaEditor._ksonEditor.start();
            globalLspStarted = true;
            // The document editor will share the same language features
            // without starting its own LSP
        }
        // Monitor changes in both editors
        schemaEditor._ksonEditor.getEditor().getModel()?.onDidChangeContent(() => {
            debounceValidate();
        });
        documentEditor._ksonEditor.getEditor().getModel()?.onDidChangeContent(() => {
            debounceValidate();
        });
    }
    // Load default examples
    await loadSchemaExample('basic-object');
    await loadDocumentExample('valid-basic');
    // Initial validation
    await performValidation();
    async function createEditor(codeBlock, uri) {
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
        codeBlock._ksonEditor = await createKsonEditor(sharedConfig);
    }
    function updateEditorContent(editor, content) {
        if (!editor?._ksonEditor)
            return;
        editor._ksonEditor.getEditor().setValue(content);
    }
    // Debounced validation function
    const debounceValidate = debounce(() => {
        performValidation().catch(console.error);
    }, 300);
    // Function to perform validation
    async function performValidation() {
        if (!schemaEditor?._ksonEditor || !documentEditor?._ksonEditor)
            return;
        if (!validationResults)
            return;
        const schemaContent = schemaEditor._ksonEditor.getEditor().getValue();
        const documentContent = documentEditor._ksonEditor.getEditor().getValue();
        // Clear previous results
        validationResults.innerHTML = '<div class="validation-message validation-pending">Validating...</div>';
        if (!schemaContent.trim()) {
            validationResults.innerHTML = '<div class="validation-message validation-warning">Please enter a JSON Schema</div>';
            return;
        }
        if (!documentContent.trim()) {
            validationResults.innerHTML = '<div class="validation-message validation-warning">Please enter a document to validate</div>';
            return;
        }
        // Parse the schema
        const schemaResult = parseSchema(schemaContent);
        if (!schemaResult.success) {
            const errorMessage = schemaResult.errors ?
                formatValidationErrors(schemaResult.errors) :
                'Invalid schema';
            validationResults.innerHTML = `
                <div class="validation-message validation-error">
                    <strong>Schema Error:</strong>
                    <pre>${escapeHtml(errorMessage)}</pre>
                </div>
            `;
            return;
        }
        currentValidator = schemaResult.validator;
        // Validate the document
        const validationResult = validateDocument(currentValidator, documentContent);
        if (validationResult.isValid) {
            validationResults.innerHTML = `
                <div class="validation-message validation-success">
                    ✓ Document is valid
                </div>
            `;
        }
        else {
            const errorMessage = formatValidationErrors(validationResult.errors);
            validationResults.innerHTML = `
                <div class="validation-message validation-error">
                    <strong>Validation Failed:</strong>
                    <pre>${escapeHtml(errorMessage)}</pre>
                </div>
            `;
        }
    }
    // Load schema example
    async function loadSchemaExample(exampleName) {
        if (!exampleName)
            return;
        const textContent = await loadExampleContent(`../playground/schema-examples/${exampleName}.kson`);
        if (textContent) {
            updateEditorContent(schemaEditor, textContent);
        }
    }
    // Load document example
    async function loadDocumentExample(exampleName) {
        if (!exampleName)
            return;
        const textContent = await loadExampleContent(`../playground/document-examples/${exampleName}.kson`);
        if (textContent) {
            updateEditorContent(documentEditor, textContent);
        }
    }
    // Event listeners
    schemaExampleSelector?.addEventListener('change', (event) => {
        const selectedExample = event.target.value;
        if (selectedExample) {
            loadSchemaExample(selectedExample).then(() => {
                return performValidation();
            }).catch(console.error);
        }
    });
    documentExampleSelector?.addEventListener('change', (event) => {
        const selectedExample = event.target.value;
        if (selectedExample) {
            loadDocumentExample(selectedExample).then(() => {
                return performValidation();
            }).catch(console.error);
        }
    });
});
// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
//# sourceMappingURL=kson-playground-validate.js.map