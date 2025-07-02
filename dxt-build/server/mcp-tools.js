import { z } from 'zod';
import { WhippyClient } from './whippy-client.js';
/**
 * Whippy AI MCP Tools - Comprehensive API Integration
 *
 * API Documentation for AI:
 *
 * PAGINATION:
 * - All list endpoints use offset/limit pagination
 * - offset: Starting point (0-based index)
 * - limit: Maximum items per page (1-100, default 50)
 * - Response format: { data: [...], total: number }
 * - Use total to determine if more pages exist
 *
 * RATE LIMITS:
 * - Standard APIs: 25 requests/second (read/write)
 * - Time Consuming APIs: 10 requests/minute (write) - campaigns, contacts/lists, sequences
 * - High Limit APIs: 35 requests/second (write), 50 requests/second (read) - organization
 * - 429 status code indicates rate limit exceeded
 *
 * ERROR HANDLING:
 * - Format: { errors: [{ description: string }], status: number }
 * - 2xx: Success, 4xx: Client error, 5xx: Server error
 * - Always check result.success before using result.data
 *
 * CONTACT MANAGEMENT:
 * - Contacts can be created with name, email, phone
 * - Search supports name, email, phone with pagination
 * - Full contact objects include tags, notes, communication preferences
 *
 * MESSAGING:
 * - Basic email: to, subject, message, from (optional)
 * - Advanced email: supports CC, BCC, attachments, reply-to, sender name
 * - SMS: to, message, from (optional)
 * - Messages create conversations automatically
 *
 * CAMPAIGNS:
 * - Create with name, message, contact_ids (optional), scheduled_at (optional)
 * - Campaigns can be sent immediately or scheduled
 * - Analytics available for performance tracking
 *
 * AGENTS:
 * - AI voice agents with comprehensive voice settings and LLM configuration
 * - Voice models: ElevenLabs integration with various voice models
 * - Call management: Duration limits, silence handling, interruption sensitivity
 * - Post-call analysis: Structured data collection with GPT-4o-mini
 * - Version management: Track agent versions and configuration changes
 */
// Initialize Whippy client with configuration
const getWhippyClient = (config) => {
    const api_key = config?.whippy_api_key || process.env.WHIPPY_API_KEY;
    if (!api_key) {
        throw new Error('Whippy API key is required. Please configure it in the extension settings or set WHIPPY_API_KEY environment variable.');
    }
    return new WhippyClient({
        api_key,
        base_url: config?.whippy_base_url || process.env.WHIPPY_BASE_URL,
    });
};
// Helper function to create tool handlers with enhanced error handling
const createToolHandler = (toolFunction) => {
    return async (params, context) => {
        try {
            // Only initialize the client when the tool is actually called
            const client = getWhippyClient(context?.config);
            const result = await toolFunction(client, params);
            if (result.success) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: result.message || JSON.stringify(result.data, null, 2),
                        },
                    ],
                };
            }
            else {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `❌ Failed: ${result.error}`,
                        },
                    ],
                };
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            // Enhanced error handling with rate limit detection
            if (errorMessage.includes('429') || errorMessage.includes('Rate Limit')) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `⏰ Rate Limit Exceeded: ${errorMessage}\n\nPlease wait before retrying. Rate limits:\n- Standard APIs: 25 requests/second\n- Time Consuming APIs: 10 requests/minute\n- High Limit APIs: 35-50 requests/second`,
                        },
                    ],
                };
            }
            return {
                content: [
                    {
                        type: 'text',
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
        requireUserConfirmation: true,
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
            contact_id: z.string().describe('The ID of the contact to retrieve'),
        },
        handler: createToolHandler(async (client, { contact_id }) => {
            const result = await client.getContact(contact_id);
            return {
                ...result,
                message: `📋 Contact Details:\n${JSON.stringify(result.data, null, 2)}`,
            };
        }),
    },
    {
        name: 'list_contacts',
        description: 'List contacts from Whippy with pagination. Returns { data: [...], total: number }. Use total to determine if more pages exist.',
        schema: {
            offset: z
                .number()
                .min(0)
                .default(0)
                .describe('Starting point for pagination (0-based index)'),
            limit: z
                .number()
                .min(1)
                .max(100)
                .default(50)
                .describe('Maximum number of contacts to return (1-100)'),
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
        name: 'search_contacts',
        description: 'Search contacts by name, email, or phone with pagination. Returns full contact objects including tags, notes, and communication preferences.',
        schema: {
            name: z.string().optional().describe('Contact name to search for'),
            email: z.string().email().optional().describe('Contact email to search for'),
            phone: z.string().optional().describe('Contact phone number to search for'),
            limit: z
                .number()
                .min(1)
                .max(100)
                .default(50)
                .describe('Maximum number of contacts to return (1-100)'),
            offset: z
                .number()
                .min(0)
                .default(0)
                .describe('Starting point for pagination (0-based index)'),
        },
        handler: createToolHandler(async (client, params) => {
            const result = await client.searchContacts(params);
            return {
                ...result,
                message: `🔍 Contact Search Results:\n${JSON.stringify(result.data, null, 2)}`,
            };
        }),
    },
    {
        name: 'send_or_schedule_sms_or_whatsapp',
        description: 'Send or schedule an SMS or WhatsApp message via Whippy. Phone numbers are automatically formatted to E.164 format. Schedule at is optional and must be in ISO 8601 format. From number must be a valid phone number that supports SMS or WhatsApp in the organization.',
        requireUserConfirmation: true,
        schema: {
            to: z.string().describe('Phone number to send SMS to (will be formatted to E.164)'),
            message: z.string().describe('SMS message content'),
            from: z
                .string()
                .optional()
                .describe('Sender phone number (optional, will be formatted to E.164)'),
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
        name: 'send_messaging_sms',
        description: 'Send a comprehensive SMS message via Whippy Messaging API with support for attachments, scheduling, and contact management. Phone numbers are automatically formatted to E.164 format.',
        requireUserConfirmation: true,
        schema: {
            to: z.string().describe('Phone number to send SMS to (will be formatted to E.164)'),
            from: z.string().describe('Phone number to send SMS from (will be formatted to E.164)'),
            body: z.string().max(1000).describe('SMS message body (max 1000 characters)'),
            attachments: z.array(z.string()).optional().describe('Array of attachment URLs'),
            schedule_at: z.string().optional().describe('Scheduled date (ISO 8601 format)'),
            opt_in_to_all_channels: z
                .boolean()
                .optional()
                .describe('Opt contact into all organization channels'),
            opt_in_to: z
                .array(z.string())
                .optional()
                .describe('Array of specific channel IDs to opt contact into'),
        },
        handler: createToolHandler(async (client, params) => {
            const result = await client.sendMessagingSMS(params);
            return {
                ...result,
                message: `📱 Messaging SMS sent successfully!\n\nMessage ID: ${result.data?.id}\nContact ID: ${result.data?.contact_id}\nConversation ID: ${result.data?.conversation_id}\nDelivery Status: ${result.data?.delivery_status}\n\nFull Response:\n${JSON.stringify(result.data, null, 2)}`,
            };
        }),
    },
    {
        name: 'send_email',
        description: 'Send a comprehensive email message via Whippy Messaging API with support for attachments, CC/BCC, reply-to, and sender name',
        requireUserConfirmation: true,
        schema: {
            to: z.string().describe('Recipient email address'),
            from: z.string().describe('Sender email address or channel ID'),
            subject: z.string().describe('Email subject'),
            body: z.string().describe('Email body content (plain text or HTML)'),
            cc: z.string().optional().describe('CC recipient email address'),
            bcc: z.string().optional().describe('BCC recipient email address'),
            reply_to: z.string().optional().describe('Reply-to email address'),
            sender_name: z.string().optional().describe('Sender display name'),
            attachments: z.array(z.string()).optional().describe('Array of attachment URLs'),
            opt_in_to_all_channels: z
                .boolean()
                .optional()
                .describe('Opt contact into all organization channels'),
            opt_in_to: z
                .array(z.string())
                .optional()
                .describe('Array of specific channel IDs to opt contact into'),
        },
        handler: createToolHandler(async (client, params) => {
            const result = await client.sendMessagingEmail(params);
            return {
                ...result,
                message: `📧 Messaging Email sent successfully!\n${JSON.stringify(result.data, null, 2)}`,
            };
        }),
    },
    {
        name: 'create_campaign',
        description: 'Create a new campaign in Whippy',
        requireUserConfirmation: true,
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
        handler: createToolHandler(async (client) => {
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
        requireUserConfirmation: true,
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
        requireUserConfirmation: true,
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
            conversation_id: z.string().describe('The ID of the conversation to retrieve'),
        },
        handler: createToolHandler(async (client, { conversation_id }) => {
            const result = await client.getConversation(conversation_id);
            return {
                ...result,
                message: `💬 Conversation Details:\n${JSON.stringify(result.data, null, 2)}`,
            };
        }),
    },
    {
        name: 'list_conversations',
        description: 'List conversations from Whippy with pagination. Returns { data: [...], total: number }. Use total to determine if more pages exist.',
        schema: {
            offset: z
                .number()
                .min(0)
                .default(0)
                .describe('Starting point for pagination (0-based index)'),
            limit: z
                .number()
                .min(1)
                .max(100)
                .default(50)
                .describe('Maximum number of conversations to return (1-100)'),
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
            campaign_id: z.string().describe('The ID of the campaign to get analytics for'),
        },
        handler: createToolHandler(async (client, { campaign_id }) => {
            const result = await client.getCampaignAnalytics(campaign_id);
            return {
                ...result,
                message: `📊 Campaign Analytics:\n${JSON.stringify(result.data, null, 2)}`,
            };
        }),
    },
    {
        name: 'list_agents',
        description: 'List AI agents from Whippy with pagination. Returns { data: [...], total: number }. Agents include voice settings, LLM configuration, and call handling preferences.',
        schema: {
            name: z.string().optional().describe('Filter agents by name'),
            limit: z
                .number()
                .min(1)
                .max(100)
                .default(50)
                .describe('Maximum number of agents to return (1-100)'),
            offset: z
                .number()
                .min(0)
                .default(0)
                .describe('Starting point for pagination (0-based index)'),
        },
        handler: createToolHandler(async (client, { name, limit, offset }) => {
            const params = { limit, offset };
            if (name)
                params.name = name;
            const result = await client.listAgents(params);
            return {
                ...result,
                message: `🤖 Agents (Offset: ${offset}, Limit: ${limit}):\n${JSON.stringify(result.data, null, 2)}`,
            };
        }),
    },
    {
        name: 'get_agent',
        description: 'Get a specific AI agent by ID. Returns full agent details including voice settings, LLM configuration, and provider settings.',
        schema: {
            agent_id: z.string().describe('The ID of the agent to retrieve'),
        },
        handler: createToolHandler(async (client, { agent_id }) => {
            const result = await client.getAgent(agent_id);
            return {
                ...result,
                message: `🤖 Agent Details:\n${JSON.stringify(result.data, null, 2)}`,
            };
        }),
    },
    {
        name: 'initiate_agent_call',
        description: 'Initiate an outbound call with an AI agent. Agent must be active with an active LLM, and channel must support AI agents. Phone numbers are automatically formatted to E.164 format. Custom placeholders can be passed to the agent during the call.',
        requireUserConfirmation: true,
        schema: {
            agent_id: z.string().describe('The ID of the agent to use for the call'),
            from: z
                .string()
                .describe('Phone number to call from (must support AI agents, will be formatted to E.164)'),
            to: z.string().describe('Phone number to call (will be formatted to E.164)'),
            custom_placeholders_data: z
                .record(z.string())
                .optional()
                .describe('Custom key/value pairs to pass to the agent during the call (all values must be strings)'),
        },
        handler: createToolHandler(async (client, { agent_id, from, to, custom_placeholders_data }) => {
            const result = await client.initiateAgentCall(agent_id, {
                from,
                to,
                custom_placeholders_data,
            });
            return {
                ...result,
                message: `📞 Agent Call Initiated:\n${JSON.stringify(result.data, null, 2)}`,
            };
        }),
    },
];
//# sourceMappingURL=mcp-tools.js.map