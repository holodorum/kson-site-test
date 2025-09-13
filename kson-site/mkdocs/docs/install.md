# Getting Started

KSON is a fully self-contained configuration language designed to be an improved interface on plain text data. This guide will help you get started with KSON across different environments and use cases.

## Editor Support

### IntelliJ IDEA

Install the KSON plugin directly from the JetBrains Marketplace:

1. Open IntelliJ IDEA
2. Go to **Settings/Preferences** → **Plugins**
3. Search for "KSON"
4. Click **Install** and restart the IDE

Features:
- Syntax highlighting
- Code completion
- Error detection
- Refactoring support

### Visual Studio Code

Install the KSON extension from the VS Code Marketplace:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "KSON"
4. Click **Install**

Features:
- Syntax highlighting
- Code snippets
- Format on save
- Bracket matching

## CLI Tool

The KSON CLI provides command-line utilities for working with KSON files.

### Installation

```bash
# Download the latest release
curl -L https://github.com/kson-org/kson-cli/releases/latest/download/kson-cli -o kson
chmod +x kson
sudo mv kson /usr/local/bin/
```

### Usage

```bash
# Validate a KSON file
kson validate config.kson

# Convert KSON to JSON
kson convert config.kson --output config.json

# Format KSON file
kson format config.kson

# Watch for changes
kson watch config.kson --on-change "./reload.sh"
```

## Playground

Try KSON directly in your browser without any installation:

🌐 **[playground.kson.org](https://playground.kson.org)**

Features:
- Live syntax validation
- Real-time conversion to JSON/YAML
- Share configurations via URL
- Example templates

## Language Bindings

### Python

Install via pip:

```bash
pip install kson
```

Usage:

```python
import kson

# Parse KSON file
config = kson.load("config.kson")

# Parse KSON string
data = kson.loads("""
server {
    host: "localhost"
    port: 8080
}
""")

# Access values
print(data.server.host)  # "localhost"
print(data.server.port)  # 8080

# Convert to dict
config_dict = data.to_dict()
```

### Rust

Add to your `Cargo.toml`:

```toml
[dependencies]
kson = "1.0"
```

Usage:

```rust
use kson::{parse, Value};

fn main() -> Result<(), kson::Error> {
    // Parse KSON file
    let config = kson::from_file("config.kson")?;
    
    // Parse KSON string
    let data: Value = parse(r#"
        server {
            host: "localhost"
            port: 8080
        }
    "#)?;
    
    // Access values
    let host = data["server"]["host"].as_str().unwrap();
    let port = data["server"]["port"].as_i64().unwrap();
    
    println!("Server: {}:{}", host, port);
    Ok(())
}
```

### Java

Add to your `build.gradle`:

```gradle
dependencies {
    implementation 'org.kson:kson:1.0.0'
}
```

Or Maven `pom.xml`:

```xml
<dependency>
    <groupId>org.kson</groupId>
    <artifactId>kson</artifactId>
    <version>1.0.0</version>
</dependency>
```

Usage:

```java
import org.kson.KSON;
import org.kson.KSONObject;

public class Example {
    public static void main(String[] args) {
        // Parse KSON file
        KSONObject config = KSON.parseFile("config.kson");
        
        // Parse KSON string
        KSONObject data = KSON.parse("""
            server {
                host: "localhost"
                port: 8080
            }
        """);
        
        // Access values
        String host = data.getString("server.host");
        int port = data.getInt("server.port");
        
        System.out.println("Server: " + host + ":" + port);
    }
}
```

## Building from Source

If you want to build KSON from source:

```bash
# Clone the repository
git clone https://github.com/kson-org/kson.git
cd kson

# Build with Gradle
./gradlew build

# Run tests
./gradlew test
```

## Next Steps

- Read the [Syntax Guide](syntax.md) to learn KSON's syntax
- Explore [Examples](examples.md) for common use cases
- Check the [API Reference](api.md) for detailed documentation
- Join our [Discord](https://discord.gg/kson) community for help and discussions