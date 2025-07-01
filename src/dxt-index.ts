// @ts-ignore: This import works after build
import { tools } from './mcp-tools.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { z } from 'zod';

// Log uncaught exceptions and unhandled rejections
process.on('uncaughtException', err => {
  console.error('[uncaughtException]', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[unhandledRejection]', reason);
});

console.error('Starting Whippy MCP server...');

// Simple stdin/stdout handler
process.stdin.setEncoding('utf8');

let initialized = false;

process.stdin.on('data', data => {
  try {
    const lines = data.toString().trim().split('\n');

    for (const line of lines) {
      if (line.trim()) {
        console.error('[server] Received:', line);

        const request = JSON.parse(line);

        if (request.method === 'initialize') {
          console.error('[server] Handling initialize');
          const response = {
            jsonrpc: '2.0',
            id: request.id,
            result: {
              protocolVersion: '2024-11-05',
              capabilities: {
                tools: {
                  listChanged: true,
                },
              },
              serverInfo: {
                name: 'whippy-ai-mcp-dxt',
                version: '1.0.0',
              },
            },
          };

          initialized = true;
          console.error('[server] Sending initialize response');
          process.stdout.write(JSON.stringify(response) + '\n');
          console.error('[server] Initialization complete, server should stay alive.');
        } else if (request.method === 'tools/list') {
          console.error('[server] Handling tools/list');

          // Convert Zod schemas to JSON Schema format
          const toolsWithJsonSchema = tools.map((tool: any) => {
            // Always wrap in z.object, even if empty
            const zodSchema = z.object(tool.schema || {});
            const jsonSchema = zodToJsonSchema(zodSchema, {
              $refStrategy: 'none',
              target: 'openApi3',
            });
            return {
              name: tool.name,
              description: tool.description,
              inputSchema: jsonSchema, // Return the whole JSON Schema object
            };
          });

          const response = {
            jsonrpc: '2.0',
            id: request.id,
            result: {
              tools: toolsWithJsonSchema,
            },
          };

          console.error('[server] Sending tools/list response');
          process.stdout.write(JSON.stringify(response) + '\n');
        } else if (request.method === 'tools/call') {
          console.error('[server] Handling tools/call');
          const { name, arguments: args } = request.params;
          const tool = tools.find((t: any) => t.name === name);

          if (!tool) {
            console.error(`[server] Tool not found: ${name}`);
            const errorResponse = {
              jsonrpc: '2.0',
              id: request.id,
              error: {
                code: -32601,
                message: `Tool ${name} not found`,
              },
            };
            process.stdout.write(JSON.stringify(errorResponse) + '\n');
            return;
          }

          // Handle tool call asynchronously
          tool
            .handler(args)
            .then((result: any) => {
              const response = {
                jsonrpc: '2.0',
                id: request.id,
                result: {
                  content: [
                    {
                      type: 'text',
                      text: JSON.stringify(result, null, 2),
                    },
                  ],
                },
              };
              console.error('[server] Sending tools/call response');
              process.stdout.write(JSON.stringify(response) + '\n');
            })
            .catch((error: unknown) => {
              console.error('[server] Tool execution error:', error);
              const errorResponse = {
                jsonrpc: '2.0',
                id: request.id,
                error: {
                  code: -32603,
                  message: error instanceof Error ? error.message : String(error),
                },
              };
              process.stdout.write(JSON.stringify(errorResponse) + '\n');
            });
        } else {
          console.error('[server] Unknown method:', request.method);
        }
      }
    }
  } catch (error: unknown) {
    console.error('[server] Error processing request:', error);
  }
});

// Keep the process alive and log every second
setInterval(() => {
  if (initialized) {
    console.error('[server] Still alive...');
  }
}, 1000);

console.error('Whippy MCP server ready with tools');
