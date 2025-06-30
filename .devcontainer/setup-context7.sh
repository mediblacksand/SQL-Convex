#!/bin/bash

# Setup Context7 MCP Server for SQL & Convex Learning Platform
echo "🚀 Setting up Context7 MCP Server..."

# Check Node version
echo "📋 Current Node.js version:"
node --version

# Install Context7 globally
echo "📦 Installing Context7 MCP Server..."
npm install -g @upstash/context7-mcp

# Test installation
echo "✅ Testing Context7 installation..."
npx @upstash/context7-mcp --help

echo "🎉 Context7 MCP Server setup complete!"
echo ""
echo "📖 Usage:"
echo "  - In Claude/AI tools, use 'use context7' in prompts"
echo "  - For MCP connections, use: npx @upstash/context7-mcp"
echo "  - Remote server: https://mcp.context7.com/mcp"
echo ""
echo "🔧 MCP Configuration for Claude Desktop:"
echo "  Add to claude_desktop_config.json:"
echo '  {
    "mcpServers": {
      "context7": {
        "command": "npx",
        "args": ["-y", "@upstash/context7-mcp"]
      }
    }
  }'