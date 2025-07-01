import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';
import { WhippyClient } from '../../src/lib/whippy-client.js';

// Initialize Whippy client - API key should be set in environment variables
const getWhippyClient = () => {
  const apiKey = process.env.WHIPPY_API_KEY;
  if (!apiKey) {
    throw new Error('WHIPPY_API_KEY environment variable is required');
  }
  return new WhippyClient({ apiKey });
};

const handler = createMcpHandler(async (server) => {
  // Contact Management Tools
  server.tool(
    'create_contact',
    'Create a new contact in Whippy',
    {
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      tags: z.array(z.string()).optional(),
      customFields: z.record(z.any()).optional()
    },
    async (params) => {
      try {
        const client = getWhippyClient();
        const result = await client.createContact(params);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `✅ Contact created successfully!\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to create contact: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error creating contact: ${errorMessage}`
          }]
        };
      }
    }
  );

  server.tool(
    'get_contact',
    'Get a contact by ID from Whippy',
    {
      contactId: z.string().describe('The ID of the contact to retrieve')
    },
    async ({ contactId }) => {
      try {
        const client = getWhippyClient();
        const result = await client.getContact(contactId);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `📋 Contact Details:\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to get contact: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error getting contact: ${errorMessage}`
          }]
        };
      }
    }
  );

  server.tool(
    'list_contacts',
    'List contacts from Whippy with pagination',
    {
      page: z.number().min(1).default(1).describe('Page number for pagination'),
      limit: z.number().min(1).max(100).default(50).describe('Number of contacts per page')
    },
    async ({ page, limit }) => {
      try {
        const client = getWhippyClient();
        const result = await client.listContacts(page, limit);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `📋 Contacts (Page ${page}):\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to list contacts: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error listing contacts: ${errorMessage}`
          }]
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
      from: z.string().optional().describe('Sender phone number (optional)')
    },
    async ({ to, message, from }) => {
      try {
        const client = getWhippyClient();
        const result = await client.sendSMS(to, message, from);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `📱 SMS sent successfully!\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to send SMS: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error sending SMS: ${errorMessage}`
          }]
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
      from: z.string().email().optional().describe('Sender email address (optional)')
    },
    async ({ to, subject, message, from }) => {
      try {
        const client = getWhippyClient();
        const result = await client.sendEmail(to, subject, message, from);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `📧 Email sent successfully!\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to send email: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error sending email: ${errorMessage}`
          }]
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
      message: z.string().describe('Campaign message content'),
      contactIds: z.array(z.string()).optional().describe('Array of contact IDs to target'),
      scheduledAt: z.string().optional().describe('Schedule campaign for later (ISO date string)')
    },
    async (params) => {
      try {
        const client = getWhippyClient();
        const result = await client.createCampaign(params);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `🚀 Campaign created successfully!\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to create campaign: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error creating campaign: ${errorMessage}`
          }]
        };
      }
    }
  );

  server.tool(
    'list_campaigns',
    'List all campaigns from Whippy',
    {},
    async () => {
      try {
        const client = getWhippyClient();
        const result = await client.listCampaigns();
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `🚀 Campaigns:\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to list campaigns: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error listing campaigns: ${errorMessage}`
          }]
        };
      }
    }
  );

  server.tool(
    'send_campaign',
    'Send a campaign immediately via Whippy',
    {
      campaignId: z.string().describe('The ID of the campaign to send')
    },
    async ({ campaignId }) => {
      try {
        const client = getWhippyClient();
        const result = await client.sendCampaign(campaignId);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `🚀 Campaign sent successfully! ${result.message}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to send campaign: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error sending campaign: ${errorMessage}`
          }]
        };
      }
    }
  );

  // Lead Management Tools
  server.tool(
    'create_lead',
    'Create a new lead in Whippy',
    {
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      source: z.string().optional().describe('Lead source'),
      status: z.string().optional().describe('Lead status')
    },
    async (params) => {
      try {
        const client = getWhippyClient();
        const result = await client.createLead(params);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `🎯 Lead created successfully!\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to create lead: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error creating lead: ${errorMessage}`
          }]
        };
      }
    }
  );

  // Conversation Management Tools
  server.tool(
    'list_conversations',
    'List all conversations from Whippy',
    {},
    async () => {
      try {
        const client = getWhippyClient();
        const result = await client.listConversations();
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `💬 Conversations:\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to list conversations: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error listing conversations: ${errorMessage}`
          }]
        };
      }
    }
  );

  server.tool(
    'get_conversation',
    'Get a specific conversation by ID from Whippy',
    {
      conversationId: z.string().describe('The ID of the conversation to retrieve')
    },
    async ({ conversationId }) => {
      try {
        const client = getWhippyClient();
        const result = await client.getConversation(conversationId);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `💬 Conversation Details:\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to get conversation: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error getting conversation: ${errorMessage}`
          }]
        };
      }
    }
  );

  // Analytics Tools
  server.tool(
    'get_campaign_analytics',
    'Get analytics for a specific campaign from Whippy',
    {
      campaignId: z.string().describe('The ID of the campaign to get analytics for')
    },
    async ({ campaignId }) => {
      try {
        const client = getWhippyClient();
        const result = await client.getCampaignAnalytics(campaignId);
        
        if (result.success) {
          return {
            content: [{
              type: 'text',
              text: `📊 Campaign Analytics:\n${JSON.stringify(result.data, null, 2)}`
            }]
          };
        } else {
          return {
            content: [{
              type: 'text',
              text: `❌ Failed to get campaign analytics: ${result.error}`
            }]
          };
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{
            type: 'text',
            text: `❌ Error getting campaign analytics: ${errorMessage}`
          }]
        };
      }
    }
  );
});

export { handler as GET, handler as POST, handler as DELETE };