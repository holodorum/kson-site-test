2; // @ts-ignore
import { Kson, Result } from '../vendor/kson-api/kson-lib-kotlin.mjs';
/**
 * Compile KSON content to JSON or YAML format
 */
export function compileKson(content, format) {
    try {
        const kson = Kson.getInstance();
        const result = format === 'json' ? kson.toJson(content) : kson.toYaml(content);
        if (result instanceof Result.Success) {
            return {
                success: true,
                output: result.output
            };
        }
        else {
            return {
                success: false,
                error: 'Compilation failed'
            };
        }
    }
    catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}
/**
 * Create a debounced version of a function
 */
export function debounce(fn, delay) {
    let timeoutId = null;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}
/**
 * Load example content from HTML file
 */
export async function loadExampleContent(examplePath) {
    try {
        const response = await fetch(examplePath);
        if (response.ok) {
            const html = await response.text();
            // Parse HTML to get text content
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            return tempDiv.textContent || tempDiv.innerText || '';
        }
    }
    catch (error) {
        console.error(`Failed to fetch example at ${examplePath}:`, error);
    }
    return '';
}
//# sourceMappingURL=kson-utils.js.map