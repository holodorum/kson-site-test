import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertTrue
import java.io.File
import kotlin.io.path.createTempDirectory

class ValidateDocsKsonTest {
    
    private val tempDir = createTempDirectory("kson-test").toFile()
    
    @Test
    fun testMainWithValidKson() {
        val tempFile = File(tempDir, "valid.md")
        tempFile.writeText("""
            # Test Document
            
            ```kson
            null
            ```
            
            ```kson
            {
              key: "value"
              number: 42
            }
            ```
        """.trimIndent())
        
        val exitCode = ValidateDocsKson.run(arrayOf(tempFile.absolutePath))
        assertEquals(0, exitCode, "Valid KSON should return exit code 0")
    }
    
    @Test
    fun testMainWithInvalidKson() {
        val tempFile = File(tempDir, "invalid.md")
        tempFile.writeText("""
            # Test Document
            
            ```kson
            invalid kson content here
            ```
        """.trimIndent())
        
        // Capture stderr to verify error output
        val originalErr = System.err
        val baos = java.io.ByteArrayOutputStream()
        val ps = java.io.PrintStream(baos)
        System.setErr(ps)
        
        val exitCode = ValidateDocsKson.run(arrayOf(tempFile.absolutePath))
        System.setErr(originalErr)
        
        assertEquals(1, exitCode, "Invalid KSON should return exit code 1")
        
        val output = baos.toString()
        assertTrue(output.contains("invalid.md"), "Error should reference the file")
        assertTrue(output.contains(":"), "Error should use file:line:column format")
    }
    
    @Test
    fun testMainWithNoArgs() {
        val originalErr = System.err
        val baos = java.io.ByteArrayOutputStream()
        val ps = java.io.PrintStream(baos)
        System.setErr(ps)
        
        val exitCode = ValidateDocsKson.run(arrayOf())
        System.setErr(originalErr)
        
        assertEquals(1, exitCode, "No args should return exit code 1")
        
        val output = baos.toString()
        assertTrue(output.contains("No input path specified"), "Should show error for missing path")
    }
    
    @Test
    fun testMainWithNonExistentFile() {
        val originalErr = System.err
        val baos = java.io.ByteArrayOutputStream()
        val ps = java.io.PrintStream(baos)
        System.setErr(ps)
        
        val exitCode = ValidateDocsKson.run(arrayOf("/non/existent/file.md"))
        System.setErr(originalErr)
        
        assertEquals(1, exitCode, "Non-existent file should return exit code 1")
        
        val output = baos.toString()
        assertTrue(output.contains("Path not found"), "Should show error for non-existent path")
    }
    
    @Test
    fun testMainWithEmptyMarkdown() {
        val tempFile = File(tempDir, "empty.md")
        tempFile.writeText("# No KSON blocks here")
        
        val exitCode = ValidateDocsKson.run(arrayOf(tempFile.absolutePath))
        assertEquals(0, exitCode, "No KSON blocks should return exit code 0")
    }
    
    @Test
    fun testMainWithMixedValidAndInvalid() {
        val tempFile = File(tempDir, "mixed.md")
        tempFile.writeText("""
            # Test Document
            
            ```kson
            null
            ```
            
            ```kson
            this is invalid
            ```
            
            ```kson
            true
            ```
        """.trimIndent())
        
        val originalErr = System.err
        val baos = java.io.ByteArrayOutputStream()
        val ps = java.io.PrintStream(baos)
        System.setErr(ps)
        
        val exitCode = ValidateDocsKson.run(arrayOf(tempFile.absolutePath))
        System.setErr(originalErr)
        
        assertEquals(1, exitCode, "Invalid blocks should return exit code 1")
        
        val output = baos.toString()
        assertTrue(output.contains("mixed.md"), "Error should reference the file")
    }
    
    @Test
    fun testValidateDirectory() {
        val docsDir = File(tempDir, "docs")
        docsDir.mkdirs()
        
        // Create multiple markdown files
        File(docsDir, "doc1.md").writeText("""
            # Document 1
            
            ```kson
            { key: "value" }
            ```
        """.trimIndent())
        
        File(docsDir, "doc2.md").writeText("""
            # Document 2
            
            ```kson
            [1, 2, 3]
            ```
            
            ```kson
            null
            ```
        """.trimIndent())
        
        // Capture stdout to check success messages
        val originalOut = System.out
        val baos = java.io.ByteArrayOutputStream()
        val ps = java.io.PrintStream(baos)
        System.setOut(ps)
        
        val exitCode = ValidateDocsKson.run(arrayOf(docsDir.absolutePath))
        System.setOut(originalOut)
        
        assertEquals(0, exitCode, "Valid KSON in directory should return exit code 0")
        
        val output = baos.toString()
        assertTrue(output.contains("doc1.md"), "Should validate doc1.md")
        assertTrue(output.contains("doc2.md"), "Should validate doc2.md")
        assertTrue(output.contains("✓"), "Should show success checkmark")
    }
    
    @Test
    fun testValidateDirectoryWithErrors() {
        val docsDir = File(tempDir, "docs_with_errors")
        docsDir.mkdirs()
        
        File(docsDir, "valid.md").writeText("""
            ```kson
            { key: "value" }
            ```
        """.trimIndent())
        
        File(docsDir, "invalid.md").writeText("""
            ```kson
            { bad syntax here }
            ```
        """.trimIndent())
        
        val originalErr = System.err
        val baos = java.io.ByteArrayOutputStream()
        val ps = java.io.PrintStream(baos)
        System.setErr(ps)
        
        val exitCode = ValidateDocsKson.run(arrayOf(docsDir.absolutePath))
        System.setErr(originalErr)
        
        assertEquals(1, exitCode, "Directory with invalid KSON should return exit code 1")
        
        val errorOutput = baos.toString()
        assertTrue(errorOutput.contains("invalid.md"), "Error should reference invalid.md")
    }
    
    @Test
    fun testValidateEmptyDirectory() {
        val emptyDir = File(tempDir, "empty_dir")
        emptyDir.mkdirs()
        
        val originalOut = System.out
        val baos = java.io.ByteArrayOutputStream()
        val ps = java.io.PrintStream(baos)
        System.setOut(ps)
        
        val exitCode = ValidateDocsKson.run(arrayOf(emptyDir.absolutePath))
        System.setOut(originalOut)
        
        assertEquals(0, exitCode, "Empty directory should return exit code 0")
        
        val output = baos.toString()
        assertTrue(output.contains("No markdown files found"), "Should indicate no markdown files")
    }
}