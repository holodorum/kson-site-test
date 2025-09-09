2// @ts-ignore
import {Kson, Result} from '../vendor/kson-api/kson-lib-kotlin.mjs';

export interface CompilationResult {
  success: boolean;
  output?: string;
  error?: string;
}

/**
 * Compile KSON content to JSON or YAML format
 */
export function compileKson(content: string, format: 'json' | 'yaml'): CompilationResult {
  try {
    const kson = Kson.getInstance();
    const result = format === 'json' ? kson.toJson(content) : kson.toYaml(content);

    if (result instanceof Result.Success) {
      return {
        success: true,
        output: result.output
      };
    } else {
      return {
        success: false,
        error: 'Compilation failed'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

/**
 * Create a debounced version of a function
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T, 
  delay: number
): (...args:Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
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
export async function loadExampleContent(examplePath: string): Promise<string> {
  try {
    const response = await fetch(examplePath);
    
    if (response.ok) {
      const html = await response.text();
      // Parse HTML to get text content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || '';
    }
  } catch (error) {
    console.error(`Failed to fetch example at ${examplePath}:`, error);
  }
  return '';
}