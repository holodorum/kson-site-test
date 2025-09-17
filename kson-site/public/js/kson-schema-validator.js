// @ts-ignore
import { Kson, SchemaResult } from '../vendor/kson-api/kson-lib-kotlin.mjs';
/**
 * Parse a JSON Schema from KSON source
 */
export function parseSchema(schemaSource) {
    try {
        const kson = Kson.getInstance();
        const result = kson.parseSchema(schemaSource);
        if (result instanceof SchemaResult.Success) {
            return {
                success: true,
                validator: result.schemaValidator
            };
        }
        else if (result instanceof SchemaResult.Failure) {
            return {
                success: false,
                errors: formatErrors(result.errors)
            };
        }
    }
    catch (error) {
        return {
            success: false,
            errors: [{
                    message: error instanceof Error ? error.message : String(error),
                    severity: 'error'
                }]
        };
    }
    return {
        success: false,
        errors: [{
                message: 'Unknown error parsing schema',
                severity: 'error'
            }]
    };
}
/**
 * Validate a KSON document against a schema validator
 */
export function validateDocument(validator, documentSource) {
    try {
        const errors = validator.validate(documentSource);
        if (!errors || errors.length === 0) {
            return {
                isValid: true,
                errors: []
            };
        }
        return {
            isValid: false,
            errors: formatErrors(errors)
        };
    }
    catch (error) {
        return {
            isValid: false,
            errors: [{
                    message: error instanceof Error ? error.message : String(error),
                    severity: 'error'
                }]
        };
    }
}
/**
 * Format KSON error messages into ValidationError objects
 */
function formatErrors(messages) {
    if (!messages)
        return [];
    // Ensure messages is an array
    const messageArray = Array.isArray(messages) ? messages : [messages];
    return messageArray.map(msg => ({
        message: msg.message || String(msg),
        line: msg.start?.line,
        column: msg.start?.column,
        severity: msg.severity === 'ERROR' ? 'error' : 'warning'
    }));
}
/**
 * Create a formatted error display string
 */
export function formatValidationErrors(errors) {
    if (errors.length === 0)
        return '';
    return errors.map(error => {
        let location = '';
        if (error.line !== undefined) {
            location = ` (line ${error.line + 1}`;
            if (error.column !== undefined) {
                location += `, column ${error.column + 1}`;
            }
            location += ')';
        }
        return `• ${error.message}${location}`;
    }).join('\n');
}
//# sourceMappingURL=kson-schema-validator.js.map