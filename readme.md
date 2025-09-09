# Build Site

The site depends on:
- the build of the monaco editor in KSON => tooling:lsp-clients:buildMonaco
- the kson api => lib-kotlin
  - api docs generation
- docs/

- some customizations to pygments. 

Run 
```shell
git submodule init && git submodule update --recursive 
cd kson-site && ./gradlew wrapper
```
Ensure we can pull in lib-kotlin dependency (it's used for validation tasks)
```shell
cd kson-site && ./gradlew :lib-kotlin:publishToMavenLocal
```

Now, from the [kson-site](./kson-site) you can run the following commands.
```shell
./gradlew buildSite
./gradlew buildDocs

./gradlew serveSite
./gradlew serveDocs
```
The site is static and all files will end up  [public](./kson-site/public)