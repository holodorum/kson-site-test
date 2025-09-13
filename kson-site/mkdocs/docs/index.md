# KSON Documentation

KSON is a configuration language designed to be an **improved interface on plain text data**, particularly at the
human/machine boundary. KSON is:

- Robust and efficient like JSON
- Clean and readable like YAML
- Flexibly formatted with built-in pretty-printing
- Clear and helpful, with user-centric errors
- Richly supported across VS Code, JetBrains IDEs, and any LSP-compatible editor
- Type-safe with JSON Schema support
- Ready to run everywhere with multi-platform compatibility

KSON is a **superset of JSON**. Some key ways KSON extends JSON's syntax:

- KSON includes a "plain" syntax for [objects](syntax.md#plain-objects) and [lists](syntax.md#plain-dash-lists) allowing
  its [default format](syntax.md#plain-format-example) to look a lot like YAML, without relying on significant whitespace
- KSON introduces the [Embed Block](syntax.md#embed-blocks), a structure for ergonomically embedding complex content such as code
  blocks
- KSON adds flexibility to [Strings](syntax.md#strings), allowing unquoted "simple" strings and supporting single-quotes as an
  alternative to double-quotes

## Learn More

- [**Getting Started**](install.md) - Installation and setup guides for all platforms
- [**Syntax & Grammar**](syntax.md) - Complete reference for KSON syntax and features
- [**Blog**](blog/index.md) - Latest news and updates