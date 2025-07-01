import { createMcpHandler } from '@vercel/mcp-adapter';
import { tools } from './src/lib/mcp-tools';

const handler = createMcpHandler(async server => {
  console.error('Initializing Whippy MCP server...');

  // Register all tools
  tools.forEach((tool: any) => {
    server.tool(tool.name, tool.description, tool.schema, tool.handler);
  });

  console.error(`Registered ${tools.length} tools successfully`);
});

export default handler;
