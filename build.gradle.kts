plugins {
    base
    kotlin("jvm")
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
    implementation(project(":lib-kotlin"))
    testImplementation(kotlin("test"))
    testImplementation(kotlin("test-junit"))
}

// Task that depends on lib-kotlin JavaScript production build
val copyKsonApiAssets by tasks.registering(Copy::class) {
    dependsOn(":lib-kotlin:jsBrowserProductionLibraryDistribution")
    from("${project(":lib-kotlin").layout.buildDirectory.get()}/dist/js/productionLibrary")
    into("$projectDir/public/vendor/kson-api")
}

// Task that depends on monaco build
val copyMonacoAssets by tasks.registering(Copy::class) {
    dependsOn(":tooling:lsp-clients:npm_run_buildMonaco")
    from("${project(":tooling:lsp-clients").projectDir}/monaco/dist")
    into("$projectDir/public/vendor/monaco")
}

// Task that depends on lib-kotlin Dokka documentation build
val copyKotlinApiDocs by tasks.registering(Copy::class) {
    dependsOn(":lib-kotlin:dokkaHtml")
    from("${project(":lib-kotlin").layout.buildDirectory.get()}/dokka")
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
val buildDocs by tasks.pixiExec("buildDocs", "mkdocs", "build", "--clean") {
    group = "documentation"
    description = "Build documentation with MkDocs"
    
    dependsOn(copyAssetsForDocs)
    
    workingDirectory.set(file("$projectDir/mkdocs"))
}

// Task to serve the entire website
val serveSite by tasks.pixiExec("serveSite", "python", "-m", "http.server", "8000") {
    group = "documentation"
    description = "Serve the complete KSON website including docs"
    
    workingDirectory.set(file("$projectDir/public"))
    
    doFirst {
        println("Starting KSON website server at http://localhost:8000")
        println("Press Ctrl+C to stop")
    }
}

// Task to serve documentation only with live reload (for docs development)
val serveDocs by tasks.pixiExec("serveDocs", "mkdocs", "serve", "--dev-addr=localhost:8001") {
    group = "documentation"
    description = "Serve documentation only with live reload"
    
    dependsOn(copyAssetsForDocs)
    
    workingDirectory.set(file("$projectDir/mkdocs"))
    
    doFirst {
        println("Starting MkDocs server at http://localhost:8001/docs/")
        println("Press Ctrl+C to stop")
    }
}

// Task to validate KSON code blocks in markdown files
val validateDocsKson by tasks.registering(JavaExec::class) {
    group = "documentation"
    description = "Validates KSON code blocks in markdown files using lib-kotlin parser"
    
    dependsOn(":lib-kotlin:compileKotlinJvm", "compileKotlin")
    
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