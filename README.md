# TimeLink

[![STD Covenant](https://img.shields.io/badge/STD_COVENANT-Codex-green?style=flat&logo=github)](https://github.com/janustack/.github/blob/main/CODEX.md)

## Tech Stack

Below is the core technology stack used in TimeLink, along with links to their documentation:

- [Bun](https://bun.sh/docs) - Fast JavaScript runtime and package manager
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) - CSS Framework
- [Tanstack Router](https://tanstack.com/router/latest/docs/framework/react/overview)
- [Tauri](https://tauri.app/start/) - Native desktop app runtime using Rust
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vite.dev/guide/)

## Prerequisites

Before getting started, make sure you have the following tools installed:

- [Bun](https://bun.sh/docs/installation)
- [Rust](https://www.rust-lang.org/tools/install)

## Recommended VS Code Extensions

These extensions enhance development specifically for this stack:

- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
- [Bun for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode)
- [Even Better TOML](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)

### General-Purpose VS Code Extensions

- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize)
- [vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

## Common CLI Commands

```bash
# To install dependencies of the application
bun install

# To update dependencies to their latest version
bun update --latest

# Start the Vite-powered React frontend in your browser
bun run dev

# Format your code
bun run format

# Open the Tauri CLI
bun run tauri

# Build the app in release mode
bun run tauri build

# Run the app in development mode
bun run tauri dev
```