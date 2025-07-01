#!/bin/bash

# Build script for Whippy AI MCP Desktop Extension
# Following the official DXT specification

set -e

echo "🚀 Building Whippy AI MCP Desktop Extension..."

# Clean previous builds
echo "📁 Cleaning previous builds..."
rm -rf dist/
rm -rf dxt-build/
rm -f whippy-ai-mcp.dxt

# Create dist directory
mkdir -p dist

# Build TypeScript for src files
echo "🔨 Building TypeScript for src files..."
npx tsc --project tsconfig.json

# Compile src/dxt-index.ts separately
echo "🔨 Compiling src/dxt-index.ts..."
npx tsc src/dxt-index.ts --target ES2022 --module ESNext --moduleResolution bundler --outDir dist --strict --esModuleInterop --skipLibCheck --forceConsistentCasingInFileNames --allowSyntheticDefaultImports --resolveJsonModule --declaration --declarationMap --sourceMap

# Create the DXT build directory structure following official spec
echo "📦 Creating DXT package structure..."
mkdir -p dxt-build/server
# mkdir -p dxt-build/types

# Copy compiled files to server directory (following official spec)
echo "📋 Copying compiled files to server directory..."
cp dist/dxt-index.js dxt-build/server/
cp dist/dxt-index.d.ts dxt-build/server/ 2>/dev/null || true
cp dist/dxt-index.js.map dxt-build/server/ 2>/dev/null || true
cp -r dist/lib/* dxt-build/server/

# Copy type definitions to types directory
# echo "📋 Copying type definitions to types directory..."
# cp dist/types/*.d.ts dxt-build/types/ 2>/dev/null || true

# Copy manifest and package files to root
cp manifest.json dxt-build/
cp dxt-package.json dxt-build/package.json

# Install production dependencies in dxt-build
echo "📦 Installing dependencies..."
cd dxt-build
# Create node_modules directory first
mkdir -p node_modules
# Create a minimal package.json inside node_modules to make it a valid npm directory
echo '{"name":"dxt-node-modules","version":"1.0.0"}' > node_modules/package.json
npm install --production --no-optional
# Ensure node_modules exists even if empty
mkdir -p node_modules
touch node_modules/.gitkeep
cd ..

# Create the .dxt file using the official DXT pack tool
echo "🗜️  Creating .dxt file using official DXT pack tool..."
cd dxt-build
npx @anthropic-ai/dxt pack . ../whippy-ai-mcp.dxt
cd ..

echo "✅ Build complete! Extension created: whippy-ai-mcp.dxt"
echo ""
echo "📋 To install in Claude Desktop:"
echo "1. Open Claude Desktop"
echo "2. Go to Settings > Extensions"
echo "3. Drag and drop whippy-ai-mcp.dxt"
echo "4. Click 'Install'"
echo "5. Configure your Whippy API key"
echo ""
echo "🧪 To test locally:"
echo "node scripts/test-dxt-server.mjs" 