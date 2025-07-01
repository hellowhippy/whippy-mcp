#!/bin/bash

# Build script for Whippy AI MCP Desktop Extension

echo "🚀 Building Whippy AI MCP Desktop Extension..."

# Create DXT build directory
mkdir -p dxt-build

# Copy necessary files
cp dxt-index.ts dxt-build/
mkdir -p dxt-build/lib
cp src/lib/whippy-client.ts dxt-build/lib/
cp src/lib/mcp-tools.ts dxt-build/lib/
mkdir -p dxt-build/types
cp src/types/whippy.ts dxt-build/types/
cp dxt-package.json dxt-build/package.json
cp manifest.json dxt-build/
# Create DXT-specific tsconfig
cat > dxt-build/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["*.ts", "lib/**/*", "types/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Install dependencies in build directory
cd dxt-build
npm install --production

# Compile TypeScript to JavaScript
npx tsc --outDir dist

# Copy compiled files to the correct structure for DXT
mkdir -p dist/lib
mkdir -p dist/types
cp lib/*.js dist/lib/ 2>/dev/null || true
cp types/*.js dist/types/ 2>/dev/null || true

# Fix the import path in the compiled dxt-index.js
sed -i '' 's|./src/lib/mcp-tools|./lib/mcp-tools|g' dist/dxt-index.js

# Create the DXT package
echo "📦 Creating DXT package..."
npx @anthropic-ai/dxt pack . ../whippy-ai-mcp.dxt

echo "✅ DXT package created: whippy-ai-mcp.dxt"
echo "📋 To install:"
echo "   1. Open Claude Desktop"
echo "   2. Go to Settings > Extensions"
echo "   3. Click 'Install from file'"
echo "   4. Select whippy-ai-mcp.dxt"
echo "   5. Configure your Whippy API key" 