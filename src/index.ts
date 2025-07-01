import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';
import { WhippyClient } from './lib/whippy-client';

// Initialize Whippy client - API key should be set in environment variables
const getWhippyClient = () => {
  const api_key = process.env.WHIPPY_API_KEY;
  if (!api_key) {
    throw new Error('WHIPPY_API_KEY environment variable is required');
  }
  return new WhippyClient({ api_key });
};

const handler = createMcpHandler(async server => {
  // Contact Management Tools
  server.tool(
    'create_contact',
    'Create a new contact in Whippy',
    {
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    },
    async params => {
      try {
        const client = getWhippyClient();
        const result = await client.createContact(params);

        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `✅ Contact created successfully!\n${JSON.stringify(result.data, null, 2)}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Failed to create contact: ${result.error}`,
              },
            ],
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error creating contact: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    'get_contact',
    'Get a contact by ID from Whippy',
    {
      contactId: z.string().describe('The ID of the contact to retrieve'),
    },
    async ({ contactId }) => {
      try {
        const client = getWhippyClient();
        const result = await client.getContact(contactId);

        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `📋 Contact Details:\n${JSON.stringify(result.data, null, 2)}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Failed to get contact: ${result.error}`,
              },
            ],
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error getting contact: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    'list_contacts',
    'List contacts from Whippy with pagination',
    {
      offset: z.number().min(0).default(0).describe('Starting point for pagination (0-based)'),
      limit: z
        .number()
        .min(1)
        .max(100)
        .default(50)
        .describe('Maximum number of contacts to return'),
    },
    async ({ offset, limit }) => {
      try {
        const client = getWhippyClient();
        const result = await client.listContacts(offset, limit);

        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `📋 Contacts (Offset: ${offset}, Limit: ${limit}):\n${JSON.stringify(result.data, null, 2)}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Failed to list contacts: ${result.error}`,
              },
            ],
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error listing contacts: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  // Messaging Tools
  server.tool(
    'send_sms',
    'Send an SMS message via Whippy',
    {
      to: z.string().describe('Phone number to send SMS to'),
      message: z.string().describe('SMS message content'),
      from: z.string().optional().describe('Sender phone number (optional)'),
    },
    async ({ to, message, from }) => {
      try {
        const client = getWhippyClient();
        const result = await client.sendSMS(to, message, from);

        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `📱 SMS sent successfully!\n${JSON.stringify(result.data, null, 2)}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Failed to send SMS: ${result.error}`,
              },
            ],
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error sending SMS: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    'send_email',
    'Send an email via Whippy',
    {
      to: z.string().email().describe('Email address to send to'),
      subject: z.string().describe('Email subject'),
      message: z.string().describe('Email message content'),
      from: z.string().email().optional().describe('Sender email (optional)'),
    },
    async ({ to, subject, message, from }) => {
      try {
        const client = getWhippyClient();
        const result = await client.sendEmail(to, subject, message, from);

        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `📧 Email sent successfully!\n${JSON.stringify(result.data, null, 2)}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Failed to send email: ${result.error}`,
              },
            ],
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error sending email: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  // Campaign Management Tools
  server.tool(
    'create_campaign',
    'Create a new campaign in Whippy',
    {
      name: z.string().describe('Campaign name'),
      message: z.string().describe('Campaign message'),
      contact_ids: z.array(z.string()).optional().describe('Array of contact IDs to target'),
      scheduled_at: z.string().optional().describe('Scheduled date (ISO string)'),
    },
    async ({ name, message, contact_ids, scheduled_at }) => {
      try {
        const client = getWhippyClient();
        const result = await client.createCampaign({ name, message, contact_ids, scheduled_at });

        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `🚀 Campaign created successfully!\n${JSON.stringify(result.data, null, 2)}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Failed to create campaign: ${result.error}`,
              },
            ],
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error creating campaign: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  server.tool('list_campaigns', 'List all campaigns from Whippy', {}, async () => {
    try {
      const client = getWhippyClient();
      const result = await client.listCampaigns();

      if (result.success) {
        return {
          content: [
            {
              type: 'text',
              text: `📊 Campaigns:\n${JSON.stringify(result.data, null, 2)}`,
            },
          ],
        };
      } else {
        return {
          content: [
            {
              type: 'text',
              text: `❌ Failed to list campaigns: ${result.error}`,
            },
          ],
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        content: [
          {
            type: 'text',
            text: `❌ Error listing campaigns: ${errorMessage}`,
          },
        ],
      };
    }
  });

  server.tool(
    'send_campaign',
    'Send a campaign immediately',
    {
      campaign_id: z.string().describe('The ID of the campaign to send'),
    },
    async ({ campaign_id }) => {
      try {
        const client = getWhippyClient();
        const result = await client.sendCampaign(campaign_id);

        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `🚀 Campaign sent successfully!\n${JSON.stringify(result.data, null, 2)}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Failed to send campaign: ${result.error}`,
              },
            ],
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error sending campaign: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  // Lead Management Tools
  server.tool(
    'create_lead',
    'Create a new lead in Whippy',
    {
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      source: z.string().optional().describe('Lead source (e.g., website, referral)'),
      status: z.string().optional().describe('Lead status (e.g., new, qualified, converted)'),
    },
    async params => {
      try {
        const client = getWhippyClient();
        const result = await client.createLead(params);

        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `🎯 Lead created successfully!\n${JSON.stringify(result.data, null, 2)}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Failed to create lead: ${result.error}`,
              },
            ],
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error creating lead: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );

  // Analytics Tools
  server.tool(
    'get_campaign_analytics',
    'Get analytics for a specific campaign',
    {
      campaign_id: z.string().describe('The ID of the campaign to get analytics for'),
    },
    async ({ campaign_id }) => {
      try {
        const client = getWhippyClient();
        const result = await client.getCampaignAnalytics(campaign_id);

        if (result.success) {
          return {
            content: [
              {
                type: 'text',
                text: `📊 Campaign Analytics:\n${JSON.stringify(result.data, null, 2)}`,
              },
            ],
          };
        } else {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Failed to get campaign analytics: ${result.error}`,
              },
            ],
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [
            {
              type: 'text',
              text: `❌ Error getting campaign analytics: ${errorMessage}`,
            },
          ],
        };
      }
    }
  );
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
          } as any;

          const result = await handler(mockReq);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: (error as Error).message }));
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(
        'Whippy MCP Server - Development Mode\n\nAvailable tools:\n- create_contact\n- get_contact\n- list_contacts\n- send_sms\n- send_email\n- create_campaign\n- list_campaigns\n- send_campaign\n- create_lead\n- get_campaign_analytics'
      );
    }
  });

  server.listen(port, () => {
    console.log(`Whippy MCP Server running at http://localhost:${port}`);
    console.log('Make sure to set WHIPPY_API_KEY environment variable');
  });
}

export { handler };
