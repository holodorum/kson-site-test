rootProject.name = "kson-site-build"

// Include the kson repository as a composite build
includeBuild("kson") {
    dependencySubstitution {
        substitute(module("org.kson:lib-kotlin")).using(project(":lib-kotlin"))
        substitute(module("org.kson:tooling:lsp-clients")).using(project(":tooling:lsp-clients"))
    }
}