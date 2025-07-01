import { tools } from './lib/mcp-tools.js';
// Log uncaught exceptions and unhandled rejections
process.on('uncaughtException', err => {
    console.error('[uncaughtException]', err);
    process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('[unhandledRejection]', reason);
    process.exit(1);
});
console.error('Starting Whippy MCP server...');
// Simple MCP server implementation
class SimpleMcpServer {
    constructor() {
        console.error('Creating simple MCP server...');
    }
    async handleRequest(request) {
        const { method, params, id } = request;
        console.error(`Handling request: ${method}`);
        try {
            switch (method) {
                case 'initialize': {
                    console.error('Handling initialize request');
                    const response = {
                        jsonrpc: '2.0',
                        id,
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
                    console.error('Sending initialize response:', JSON.stringify(response));
                    return response;
                }
                case 'tools/list': {
                    console.error('Handling tools/list request');
                    const response = {
                        jsonrpc: '2.0',
                        id,
                        result: {
                            tools: tools.map(tool => ({
                                name: tool.name,
                                description: tool.description,
                                inputSchema: tool.schema,
                            })),
                        },
                    };
                    console.error('Sending tools/list response:', JSON.stringify(response));
                    return response;
                }
                case 'tools/call': {
                    console.error('Handling tools/call request');
                    const { name, arguments: args } = params;
                    const tool = tools.find(t => t.name === name);
                    if (!tool) {
                        throw new Error(`Tool ${name} not found`);
                    }
                    const result = await tool.handler(args);
                    const response = {
                        jsonrpc: '2.0',
                        id,
                        result: {
                            content: [
                                {
                                    type: 'text',
                                    text: JSON.stringify(result, null, 2),
                                },
                            ],
                        },
                    };
                    console.error('Sending tools/call response:', JSON.stringify(response));
                    return response;
                }
                default:
                    console.error(`Unknown method: ${method}`);
                    throw new Error(`Unknown method: ${method}`);
            }
        }
        catch (error) {
            console.error('Error handling request:', error);
            return {
                jsonrpc: '2.0',
                id,
                error: {
                    code: -32603,
                    message: error instanceof Error ? error.message : String(error),
                },
            };
        }
    }
    async start() {
        console.error('Starting simple MCP server...');
        // Handle stdin/stdout communication
        process.stdin.setEncoding('utf8');
        process.stdin.on('data', async (data) => {
            try {
                const lines = data.toString().trim().split('\n');
                for (const line of lines) {
                    if (line.trim()) {
                        console.error('Received request:', line);
                        const request = JSON.parse(line);
                        const response = await this.handleRequest(request);
                        if (response) {
                            console.error('Sending response:', JSON.stringify(response));
                            process.stdout.write(JSON.stringify(response) + '\n');
                        }
                    }
                }
            }
            catch (error) {
                console.error('Error handling request:', error);
                const errorResponse = {
                    jsonrpc: '2.0',
                    id: null,
                    error: {
                        code: -32700,
                        message: 'Parse error',
                    },
                };
                process.stdout.write(JSON.stringify(errorResponse) + '\n');
            }
        });
        // Keep the process alive
        const keepAlive = setInterval(() => {
            // This keeps the event loop active
        }, 1000);
        // Handle shutdown signals
        process.on('SIGINT', () => {
            console.error('Received SIGINT, shutting down...');
            clearInterval(keepAlive);
            process.exit(0);
        });
        process.on('SIGTERM', () => {
            console.error('Received SIGTERM, shutting down...');
            clearInterval(keepAlive);
            process.exit(0);
        });
        console.error('Whippy MCP server started and ready for communication');
    }
}
// Start the server
const server = new SimpleMcpServer();
server.start().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
//# sourceMappingURL=dxt-index.js.map