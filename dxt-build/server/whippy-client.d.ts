import { WhippyConfig, Contact, Campaign, Message, Sequence, Lead, Conversation, WhippyApiResponse, PaginatedResponse, Analytics, Channel, ChannelsResponse, OrganizationResponse, ContactSearchParams, EmailMessageRequest, EmailMessageResponse, Agent, AgentSearchParams, AgentsResponse, AgentCallRequest, AgentCallResponse, SmsMessageRequest, SmsMessageResponse } from '../types/whippy';
/**
 * WhippyClient - A comprehensive client for the Whippy AI API
 *
 * API Documentation:
 * - Pagination: Uses offset/limit parameters. Responses include 'data' array and 'total' count
 * - Rate Limits:
 *   - Standard APIs: 25 requests/second (read/write)
 *   - Time Consuming APIs: 10 requests/minute (write) - campaigns, contacts/lists, sequences
 *   - High Limit APIs: 35 requests/second (write), 50 requests/second (read) - organization
 * - Error Format: { errors: [{ description: string }], status: number }
 * - HTTP Status Codes: 2xx success, 4xx client error, 5xx server error
 */
export declare class WhippyClient {
    private client;
    private api_key;
    constructor(config: WhippyConfig);
    getOrganization(): Promise<WhippyApiResponse<OrganizationResponse>>;
    validateAuth(): Promise<boolean>;
    createContact(contact: Contact): Promise<WhippyApiResponse<Contact>>;
    getContact(contact_id: string): Promise<WhippyApiResponse<Contact>>;
    listContacts(offset?: number, limit?: number): Promise<WhippyApiResponse<PaginatedResponse<Contact>>>;
    updateContact(contact_id: string, contact: Partial<Contact>): Promise<WhippyApiResponse<Contact>>;
    deleteContact(contact_id: string): Promise<WhippyApiResponse<void>>;
    searchContacts(params: ContactSearchParams): Promise<WhippyApiResponse<Contact[]>>;
    createCampaign(campaign: Campaign): Promise<WhippyApiResponse<Campaign>>;
    getCampaign(campaign_id: string): Promise<WhippyApiResponse<Campaign>>;
    listCampaigns(): Promise<WhippyApiResponse<Campaign[]>>;
    sendCampaign(campaign_id: string): Promise<WhippyApiResponse<void>>;
    sendSMS(to: string, message: string, from?: string): Promise<WhippyApiResponse<Message>>;
    sendMessagingSMS(params: SmsMessageRequest): Promise<WhippyApiResponse<SmsMessageResponse>>;
    sendEmail(to: string, subject: string, message: string, from?: string): Promise<WhippyApiResponse<Message>>;
    sendMessagingEmail(params: EmailMessageRequest): Promise<WhippyApiResponse<EmailMessageResponse>>;
    createSequence(sequence: Sequence): Promise<WhippyApiResponse<Sequence>>;
    getSequence(sequence_id: string): Promise<WhippyApiResponse<Sequence>>;
    listSequences(): Promise<WhippyApiResponse<Sequence[]>>;
    createLead(lead: Lead): Promise<WhippyApiResponse<Lead>>;
    getConversation(conversation_id: string): Promise<WhippyApiResponse<Conversation>>;
    listConversations(offset?: number, limit?: number): Promise<WhippyApiResponse<PaginatedResponse<Conversation>>>;
    getCampaignAnalytics(campaign_id: string): Promise<WhippyApiResponse<Analytics>>;
    listChannels(): Promise<WhippyApiResponse<ChannelsResponse>>;
    getChannel(channel_id: string): Promise<WhippyApiResponse<Channel>>;
    createChannel(channel: Partial<Channel>): Promise<WhippyApiResponse<Channel>>;
    updateChannel(channel_id: string, channel: Partial<Channel>): Promise<WhippyApiResponse<Channel>>;
    deleteChannel(channel_id: string): Promise<WhippyApiResponse<void>>;
    listAgents(params?: AgentSearchParams): Promise<WhippyApiResponse<AgentsResponse>>;
    getAgent(agent_id: string): Promise<WhippyApiResponse<Agent>>;
    initiateAgentCall(agent_id: string, params: AgentCallRequest): Promise<WhippyApiResponse<AgentCallResponse>>;
}
//# sourceMappingURL=whippy-client.d.ts.map