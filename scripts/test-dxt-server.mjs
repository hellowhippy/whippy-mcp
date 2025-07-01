#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing DXT MCP Server...');

// Test the compiled server
const serverPath = join(__dirname, '..', 'dxt-build', 'dist', 'dxt-index.js');
const nodePath = process.execPath;

console.log(`Using Node.js: ${nodePath}`);
console.log(`Testing server: ${serverPath}`);

const server = spawn(nodePath, [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: {
    ...process.env,
    NODE_ENV: 'production',
    WHIPPY_API_KEY: 'test-key', // Test key for initialization
  },
});

// Send initialization message
const initMessage = {
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: {
      name: 'test-client',
      version: '1.0.0',
    },
  },
};

server.stdin.write(JSON.stringify(initMessage) + '\n');

let output = '';
let errorOutput = '';

server.stdout.on('data', data => {
  output += data.toString();
  console.log('📤 Server output:', data.toString().trim());
});

server.stderr.on('data', data => {
  errorOutput += data.toString();
  console.log('⚠️  Server stderr:', data.toString().trim());
});

server.on('close', code => {
  console.log(`\n🔍 Server exited with code: ${code}`);
  console.log('📋 Full stdout:', output);
  console.log('❌ Full stderr:', errorOutput);

  if (code === 0) {
    console.log('✅ Server test completed successfully');
  } else {
    console.log('❌ Server test failed');
  }
});

// Set a timeout to kill the server if it doesn't respond
setTimeout(() => {
  console.log('⏰ Test timeout reached, killing server...');
  server.kill();
}, 10000);
