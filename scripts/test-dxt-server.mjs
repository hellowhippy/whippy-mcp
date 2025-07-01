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

let serverOutput = '';
let serverError = '';
let serverStarted = false;
let testPassed = false;

// Collect stdout
server.stdout.on('data', data => {
  const output = data.toString();
  serverOutput += output;
  console.log(`📤 Server output: ${output.trim()}`);

  // Check if we got a proper MCP initialization response
  if (
    output.includes('"protocolVersion":"2024-11-05"') &&
    output.includes('"serverInfo":{"name":"whippy-ai-mcp-dxt"')
  ) {
    testPassed = true;
    console.log('✅ Server responded with proper MCP initialization!');

    // Give the server a moment to fully start, then exit gracefully
    setTimeout(() => {
      console.log('✅ Test PASSED - Server is working correctly!');
      server.kill('SIGTERM');
      process.exit(0);
    }, 1000);
  }
});

// Collect stderr
server.stderr.on('data', data => {
  const error = data.toString();
  serverError += error;
  console.log(`⚠️  Server stderr: ${error.trim()}`);

  // Check if server has started successfully
  if (error.includes('Whippy MCP server started and connected via stdio')) {
    serverStarted = true;
    console.log('✅ Server started and connected successfully!');
  }
});

// Handle server exit
server.on('close', code => {
  console.log(`🔍 Server exited with code: ${code}`);

  if (testPassed) {
    console.log('✅ Test PASSED - Server worked correctly and exited gracefully');
    process.exit(0);
  } else if (code === 0) {
    console.log('✅ Test PASSED - Server exited cleanly');
    process.exit(0);
  } else {
    console.log('❌ Test FAILED - Server exited with error');
    console.log(`📋 Full stdout: ${serverOutput}`);
    console.log(`❌ Full stderr: ${serverError}`);
    process.exit(1);
  }
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

console.log('📤 Sending initialization message...');
server.stdin.write(JSON.stringify(initMessage) + '\n');

// Fallback timeout - if server doesn't respond within 15 seconds, consider it a failure
setTimeout(() => {
  if (!testPassed) {
    console.log('⏰ Test timeout reached, killing server...');
    server.kill('SIGTERM');

    if (serverStarted) {
      console.log("⚠️  Server started but didn't respond to initialization");
    } else {
      console.log('❌ Server failed to start properly');
    }

    console.log(`📋 Full stdout: ${serverOutput}`);
    console.log(`❌ Full stderr: ${serverError}`);
    process.exit(1);
  }
}, 15000);
