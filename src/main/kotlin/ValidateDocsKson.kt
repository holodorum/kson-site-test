import org.kson.Kson
import java.io.File
import kotlin.system.exitProcess

/**
 * KSON validator for markdown documentation.
 * Validates KSON code blocks and fails on errors.
 */
object ValidateDocsKson {
    
    data class CodeBlock(
        val lineNumber: Int,
        val content: String
    )
    
    data class ValidationError(
        val blockLine: Int,
        val errorLine: Int,
        val column: Int,
        val message: String
    )
    
    @JvmStatic
    fun main(args: Array<String>) {
        val exitCode = run(args)
        exitProcess(exitCode)
    }
    
    fun run(args: Array<String>): Int {
        if (args.isEmpty()) {
            System.err.println("Error: No input path specified")
            return 1
        }
        
        val inputPath = File(args[0])
        if (!inputPath.exists()) {
            System.err.println("Error: Path not found: ${inputPath.absolutePath}")
            return 1
        }
        
        val markdownFiles = if (inputPath.isDirectory) {
            inputPath.walkTopDown()
                .filter { it.isFile && it.extension == "md" }
                .toList()
        } else {
            listOf(inputPath)
        }
        
        if (markdownFiles.isEmpty()) {
            println("No markdown files found")
            return 0
        }
        
        var hasErrors = false
        
        for (file in markdownFiles) {
            val content = file.readText()
            val blocks = extractKsonBlocks(content)
            
            if (blocks.isNotEmpty()) {
                println("Validating ${file.relativeTo(inputPath.parentFile ?: file.parentFile)}")
                val errors = validateBlocks(blocks)
                
                if (errors.isNotEmpty()) {
                    reportErrors(errors, file.relativeTo(inputPath.parentFile ?: file.parentFile).path)
                    hasErrors = true
                } else {
                    println("  ✓ ${blocks.size} KSON block(s) validated successfully")
                }
            }
        }
        
        return if (hasErrors) 1 else 0
    }
    
    
    private fun extractKsonBlocks(content: String): List<CodeBlock> {
        val blocks = mutableListOf<CodeBlock>()
        val lines = content.lines()
        var i = 0
        
        while (i < lines.size) {
            val line = lines[i]
            if (line.trim() == "```kson" || line.trim().startsWith("```kson ")) {
                val startLine = i + 2 // Line number in file (1-indexed)
                val blockContent = StringBuilder()
                i++
                
                while (i < lines.size && lines[i].trim() != "```") {
                    blockContent.appendLine(lines[i])
                    i++
                }
                
                val ksonContent = blockContent.toString().trimEnd()
                if (ksonContent.isNotEmpty()) {
                    blocks.add(CodeBlock(startLine, ksonContent))
                }
            }
            i++
        }
        
        return blocks
    }
    
    private fun validateBlocks(
        blocks: List<CodeBlock>
    ): List<ValidationError> {
        val errors = mutableListOf<ValidationError>()
        
        blocks.forEach { block ->
            try {
                val analysis = Kson.analyze(block.content)
                
                if (analysis.errors.isNotEmpty()) {
                    analysis.errors.forEach { error ->
                        errors.add(ValidationError(
                            blockLine = block.lineNumber,
                            errorLine = block.lineNumber + error.start.line - 1,
                            column = error.start.column,
                            message = error.message
                        ))
                    }
                }
            } catch (e: Exception) {
                errors.add(ValidationError(
                    blockLine = block.lineNumber,
                    errorLine = block.lineNumber,
                    column = 1,
                    message = "Parser exception: ${e.message}"
                ))
            }
        }
        
        return errors
    }
    
    private fun reportErrors(errors: List<ValidationError>, fileName: String) {
        errors.forEach { error ->
            System.err.println("$fileName:${error.errorLine}:${error.column}: ${error.message}")
        }
    }
}