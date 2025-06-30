# Context7 MCP Server Setup

## 🎯 Overview

Context7 is an MCP (Model Context Protocol) server that provides up-to-date code documentation and context from popular libraries and frameworks. It's now configured in your development environment.

## ✅ Installation Status

- ✅ **Node.js 20**: Installed and configured
- ✅ **Context7 MCP**: Ready to use
- ✅ **Development Environment**: Configured for future container rebuilds

## 🚀 Usage

### In Claude/AI Tools
Simply use `use context7` in your prompts to get up-to-date documentation:

```
use context7 to explain React hooks best practices
use context7 to show SQL.js WASM loading patterns
use context7 to find Vite configuration examples
```

### Manual MCP Server
To run Context7 as a standalone MCP server:

```bash
# Load Node 20 environment
export NVM_DIR="/usr/local/share/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20

# Run Context7 MCP server
npx @upstash/context7-mcp
```

## 🔧 MCP Configuration

### For Claude Desktop
Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

### For VS Code/Cursor
Context7 can be configured as an MCP extension in compatible IDEs.

### Remote Server Option
Alternative: Connect to the remote server at `https://mcp.context7.com/mcp`

## 🏗️ Development Container

Your `.devcontainer/devcontainer.json` is configured to:
- Use Node.js 20 by default
- Auto-install Context7 on container creation
- Include necessary VS Code extensions

## 🔄 Environment Setup Script

Run the setup script to configure Context7:

```bash
./.devcontainer/setup-context7.sh
```

## 📚 Supported Use Cases

Context7 is particularly useful for:
- **React/TypeScript**: Latest hooks, patterns, best practices
- **Vite Configuration**: Build optimization, plugin usage
- **SQL.js**: WASM loading, query patterns
- **Tailwind CSS**: Utility classes, responsive design
- **GitHub Actions**: Workflow configuration, deployment
- **Node.js**: Latest API documentation

## 🛠️ Troubleshooting

### Node Version Issues
If you see "Unsupported engine" errors:

```bash
# Switch to Node 20
export NVM_DIR="/usr/local/share/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 20
```

### Context7 Not Found
```bash
# Reinstall Context7
npx -y @upstash/context7-mcp --help
```

## 🎉 Ready to Use

Context7 is now available in your development environment! Use it to get the latest documentation for:
- SQL.js optimization techniques
- React performance patterns  
- Vite deployment strategies
- TypeScript best practices

---

**Next Steps**: Try using `use context7` in your next AI interaction to get up-to-date code examples and documentation!