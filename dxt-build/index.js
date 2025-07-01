import { createMcpHandler } from '@vercel/mcp-adapter';
import { tools } from './lib/mcp-tools';
const handler = createMcpHandler(async (server) => {
    // Register all tools
    tools.forEach(tool => {
        server.tool(tool.name, tool.description, tool.schema, tool.handler);
    });
});
// For development, we can start a simple HTTP server
if (import.meta.url === `file://${process.argv[1]}`) {
    const port = process.env.PORT || 3000;
    console.log(`Starting Whippy MCP development server on port ${port}`);
    // Simple HTTP server for development
    const http = await import('http');
    const server = http.createServer(async (req, res) => {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', async () => {
                try {
                    // Create a mock Next.js request object
                    const mockReq = {
                        method: req.method,
                        url: req.url,
                        headers: req.headers,
                        body: JSON.parse(body || '{}'),
                    };
                    const result = await handler(mockReq);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));
                }
                catch (error) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: error.message }));
                }
            });
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Whippy MCP Server - Development Mode\n\nAvailable tools:\n- create_contact\n- get_contact\n- list_contacts\n- send_sms\n- send_email\n- create_campaign\n- list_campaigns\n- send_campaign\n- create_lead\n- get_campaign_analytics');
        }
    });
    server.listen(port, () => {
        console.log(`Whippy MCP Server running at http://localhost:${port}`);
        console.log('Make sure to set WHIPPY_API_KEY environment variable');
    });
}
export { handler };
//# sourceMappingURL=index.js.map