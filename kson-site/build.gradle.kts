plugins {
    base
    kotlin("jvm") version "2.2.10"
    id("com.github.node-gradle.node") version "7.1.0"
}

node {
    version.set("20.19.0")
    npmVersion.set("10.8.2")
    download.set(true)
}

buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("com.vladsch.flexmark:flexmark-all:0.64.8")
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.kson:lib-kotlin:1.0-SNAPSHOT")
    testImplementation(kotlin("test"))
    testImplementation(kotlin("test-junit"))
}

// Build lib-kotlin JavaScript production in kson submodule
val buildKsonJsLibrary by tasks.registering(Exec::class) {
    workingDir = file("${rootDir}/kson")
    commandLine = listOf("./gradlew", ":lib-kotlin:jsBrowserProductionLibraryDistribution")
}

// Task that copies lib-kotlin JavaScript production build
val copyKsonApiAssets by tasks.registering(Copy::class) {
    dependsOn(buildKsonJsLibrary)
    from("${rootDir}/kson/lib-kotlin/build/dist/js/productionLibrary")
    into("$projectDir/public/vendor/kson-api")
}

// Build monaco in kson submodule
val buildMonaco by tasks.registering(Exec::class) {
    workingDir = file("${rootDir}/kson")
    commandLine = listOf("./gradlew", ":tooling:lsp-clients:npm_run_buildMonaco")
}

// Task that copies monaco build
val copyMonacoAssets by tasks.registering(Copy::class) {
    dependsOn(buildMonaco)
    from("${rootDir}/kson/tooling/lsp-clients/monaco/dist")
    into("$projectDir/public/vendor/monaco")
}

// Build lib-kotlin Dokka documentation in kson submodule
val buildKotlinDocs by tasks.registering(Exec::class) {
    workingDir = file("${rootDir}/kson")
    commandLine = listOf("./gradlew", ":lib-kotlin:dokkaHtml")
}

// Task that copies lib-kotlin Dokka documentation build
val copyKotlinApiDocs by tasks.registering(Copy::class) {
    dependsOn(buildKotlinDocs)
    from("${rootDir}/kson/lib-kotlin/build/dokka")
    into("$projectDir/public/api-docs")
}

// Combined build task that runs all dependencies and copies artifacts
val buildSite by tasks.registering {
    group = "build"
    description = "Builds all dependencies and copies artifacts for kson-site"
    dependsOn(
        "npm_run_build",
        buildDocs,
        validateDocsKson,
        copyKsonApiAssets,
        copyMonacoAssets,
        copyKotlinApiDocs
    )
}

// Task to copy shared assets for MkDocs build
val copyAssetsForDocs by tasks.registering {
    doLast {
        // Copy CSS
        copy {
            from("$projectDir/public/css")
            into("$projectDir/mkdocs/docs/css")
        }
        // Copy images
        copy {
            from("$projectDir/public/assets")
            into("$projectDir/mkdocs/docs/assets")
        }
    }
}

// Task to build documentation with MkDocs
val buildDocs by tasks.registering(Exec::class) {
    group = "documentation"
    description = "Build documentation with MkDocs"
    
    dependsOn(copyAssetsForDocs)
    
    workingDir = file("$projectDir/mkdocs")
    commandLine = listOf("pixi", "run", "mkdocs", "build", "--clean")
}

// Task to serve the entire website
val serveSite by tasks.registering(Exec::class) {
    group = "documentation"
    description = "Serve the complete KSON website including docs"
    
    workingDir = file("$projectDir/public")
    commandLine = listOf("pixi", "run", "python", "-m", "http.server", "8000")
    
    doFirst {
        println("Starting KSON website server at http://localhost:8000")
        println("Press Ctrl+C to stop")
    }
}

// Task to serve documentation only with live reload (for docs development)
val serveDocs by tasks.registering(Exec::class) {
    group = "documentation"
    description = "Serve documentation only with live reload"
    
    dependsOn(copyAssetsForDocs)
    
    workingDir = file("$projectDir/mkdocs")
    commandLine = listOf("pixi", "run", "mkdocs", "serve", "--dev-addr=localhost:8001")
    
    doFirst {
        println("Starting MkDocs server at http://localhost:8001/docs/")
        println("Press Ctrl+C to stop")
    }
}

// Build lib-kotlin JVM in kson submodule for validation
val buildKsonJvmLibrary by tasks.registering(Exec::class) {
    workingDir = file("${rootDir}/kson")
    commandLine = listOf("./gradlew", ":lib-kotlin:compileKotlinJvm")
}

// Task to validate KSON code blocks in markdown files
val validateDocsKson by tasks.registering(JavaExec::class) {
    group = "documentation"
    description = "Validates KSON code blocks in markdown files using lib-kotlin parser"
    
    dependsOn(buildKsonJvmLibrary, "compileKotlin")
    
    val docsDir = file("$projectDir/mkdocs/docs")
    inputs.dir(docsDir)
    
    classpath = sourceSets["main"].runtimeClasspath
    mainClass.set("ValidateDocsKson")
    
    // Pass the docs directory
    args = listOf(docsDir.absolutePath)
    
    // Better error handling
    isIgnoreExitValue = false
}


// Clean task to remove copied assets
tasks.clean {
    delete("$projectDir/public/vendor")
    delete("$projectDir/public/api-docs")
    delete("$projectDir/public/css")
    delete("$projectDir/public/js")
}

tasks.check{
    buildSite
}