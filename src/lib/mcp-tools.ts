import { z } from 'zod';
import { WhippyClient } from './whippy-client.js';

// Initialize Whippy client with configuration
const getWhippyClient = (config: any) => {
  const api_key = config?.whippy_api_key || process.env.WHIPPY_API_KEY;
  if (!api_key) {
    throw new Error(
      'Whippy API key is required. Please configure it in the extension settings or set WHIPPY_API_KEY environment variable.'
    );
  }
  return new WhippyClient({
    api_key,
    base_url: config?.whippy_base_url || process.env.WHIPPY_BASE_URL,
  });
};

// Helper function to create tool handlers
const createToolHandler = (toolFunction: (client: WhippyClient, params: any) => Promise<any>) => {
  return async (params: any, context?: any) => {
    try {
      // Only initialize the client when the tool is actually called
      const client = getWhippyClient(context?.config);
      const result = await toolFunction(client, params);

      if (result.success) {
        return {
          content: [
            {
              type: 'text' as const,
              text: result.message || JSON.stringify(result.data, null, 2),
            },
          ],
        };
      } else {
        return {
          content: [
            {
              type: 'text' as const,
              text: `❌ Failed: ${result.error}`,
            },
          ],
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        content: [
          {
            type: 'text' as const,
            text: `❌ Error: ${errorMessage}`,
          },
        ],
      };
    }
  };
};

// Tool definitions - these are safe to export as they don't execute until called
export const tools = [
  {
    name: 'create_contact',
    description: 'Create a new contact in Whippy',
    schema: {
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
    },
    handler: createToolHandler(async (client, params) => {
      const result = await client.createContact(params);
      return {
        ...result,
        message: `✅ Contact created successfully!\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'get_contact',
    description: 'Get a contact by ID from Whippy',
    schema: {
      contactId: z.string().describe('The ID of the contact to retrieve'),
    },
    handler: createToolHandler(async (client, { contactId }) => {
      const result = await client.getContact(contactId);
      return {
        ...result,
        message: `📋 Contact Details:\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'list_contacts',
    description: 'List contacts from Whippy with pagination',
    schema: {
      offset: z.number().min(0).default(0).describe('Starting point for pagination (0-based)'),
      limit: z
        .number()
        .min(1)
        .max(100)
        .default(50)
        .describe('Maximum number of contacts to return'),
    },
    handler: createToolHandler(async (client, { offset, limit }) => {
      const result = await client.listContacts(offset, limit);
      return {
        ...result,
        message: `📋 Contacts (Offset: ${offset}, Limit: ${limit}):\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'send_sms',
    description: 'Send an SMS message via Whippy',
    schema: {
      to: z.string().describe('Phone number to send SMS to'),
      message: z.string().describe('SMS message content'),
      from: z.string().optional().describe('Sender phone number (optional)'),
    },
    handler: createToolHandler(async (client, { to, message, from }) => {
      const result = await client.sendSMS(to, message, from);
      return {
        ...result,
        message: `📱 SMS sent successfully!\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'send_email',
    description: 'Send an email message via Whippy',
    schema: {
      to: z.string().describe('Email address to send to'),
      subject: z.string().describe('Email subject'),
      message: z.string().describe('Email message content'),
      from: z.string().optional().describe('Sender email (optional)'),
    },
    handler: createToolHandler(async (client, { to, subject, message, from }) => {
      const result = await client.sendEmail(to, subject, message, from);
      return {
        ...result,
        message: `📧 Email sent successfully!\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'create_campaign',
    description: 'Create a new campaign in Whippy',
    schema: {
      name: z.string().describe('Campaign name'),
      message: z.string().describe('Campaign message content'),
      contact_ids: z.array(z.string()).optional().describe('Array of contact IDs to target'),
      scheduled_at: z.string().optional().describe('Scheduled date (ISO string)'),
    },
    handler: createToolHandler(async (client, { name, message, contact_ids, scheduled_at }) => {
      const result = await client.createCampaign({ name, message, contact_ids, scheduled_at });
      return {
        ...result,
        message: `🚀 Campaign created successfully!\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'get_campaign',
    description: 'Get a campaign by ID from Whippy',
    schema: {
      campaignId: z.string().describe('The ID of the campaign to retrieve'),
    },
    handler: createToolHandler(async (client, { campaignId }) => {
      const result = await client.getCampaign(campaignId);
      return {
        ...result,
        message: `📊 Campaign Details:\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'list_campaigns',
    description: 'List all campaigns from Whippy',
    schema: {},
    handler: createToolHandler(async client => {
      const result = await client.listCampaigns();
      return {
        ...result,
        message: `📊 Campaigns:\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'send_campaign',
    description: 'Send a campaign immediately via Whippy',
    schema: {
      campaignId: z.string().describe('The ID of the campaign to send'),
    },
    handler: createToolHandler(async (client, { campaignId }) => {
      const result = await client.sendCampaign(campaignId);
      return {
        ...result,
        message: `🚀 Campaign sent successfully!\n${result.message}`,
      };
    }),
  },

  {
    name: 'create_lead',
    description: 'Create a new lead in Whippy',
    schema: {
      name: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      source: z.string().optional().describe('Lead source (e.g., website, referral)'),
      status: z.string().optional().describe('Lead status (e.g., new, qualified, converted)'),
    },
    handler: createToolHandler(async (client, params) => {
      const result = await client.createLead(params);
      return {
        ...result,
        message: `🎯 Lead created successfully!\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'get_conversation',
    description: 'Get a conversation by ID from Whippy',
    schema: {
      conversationId: z.string().describe('The ID of the conversation to retrieve'),
    },
    handler: createToolHandler(async (client, { conversationId }) => {
      const result = await client.getConversation(conversationId);
      return {
        ...result,
        message: `💬 Conversation Details:\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'list_conversations',
    description: 'List conversations from Whippy with pagination',
    schema: {
      offset: z.number().min(0).default(0).describe('Starting point for pagination (0-based)'),
      limit: z
        .number()
        .min(1)
        .max(100)
        .default(50)
        .describe('Maximum number of conversations to return'),
    },
    handler: createToolHandler(async (client, { offset, limit }) => {
      const result = await client.listConversations(offset, limit);
      return {
        ...result,
        message: `💬 Conversations (Offset: ${offset}, Limit: ${limit}):\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },

  {
    name: 'get_campaign_analytics',
    description: 'Get analytics for a specific campaign',
    schema: {
      campaignId: z.string().describe('The ID of the campaign to get analytics for'),
    },
    handler: createToolHandler(async (client, { campaignId }) => {
      const result = await client.getCampaignAnalytics(campaignId);
      return {
        ...result,
        message: `📊 Campaign Analytics:\n${JSON.stringify(result.data, null, 2)}`,
      };
    }),
  },
];
