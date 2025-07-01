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

# Compile dxt-index.ts separately
echo "🔨 Compiling dxt-index.ts..."
npx tsc dxt-index.ts --target ES2022 --module ESNext --moduleResolution bundler --outDir dist --strict --esModuleInterop --skipLibCheck --forceConsistentCasingInFileNames --allowSyntheticDefaultImports --resolveJsonModule --declaration --declarationMap --sourceMap

# Copy necessary files to dist
echo "📋 Copying files to dist..."
cp -r src/lib dist/
cp -r src/types dist/

# Create the DXT build directory structure
echo "📦 Creating DXT package structure..."
mkdir -p dxt-build
cp -r dist/* dxt-build/
cp manifest.json dxt-build/
cp package.json dxt-build/

# Install production dependencies in dxt-build
echo "📦 Installing dependencies..."
cd dxt-build
npm install --production --no-optional
cd ..

# Create the .dxt file (ZIP archive)
echo "🗜️  Creating .dxt file..."
cd dxt-build
zip -r ../whippy-ai-mcp.dxt . -x "*.DS_Store" "node_modules/.cache/*"
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