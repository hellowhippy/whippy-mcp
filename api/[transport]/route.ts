import { createMcpHandler } from '@vercel/mcp-adapter';
import { tools } from '../../src/lib/mcp-tools';

const handler = createMcpHandler(async server => {
  tools.forEach(tool => {
    server.tool(tool.name, tool.description, tool.schema, tool.handler);
  });
});

export { handler as GET, handler as POST, handler as DELETE };
