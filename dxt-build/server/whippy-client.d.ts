import { WhippyConfig, Contact, Campaign, Message, Sequence, Lead, Conversation, WhippyApiResponse, PaginatedResponse, Analytics } from '../types/whippy';
export declare class WhippyClient {
    private client;
    private api_key;
    constructor(config: WhippyConfig);
    createContact(contact: Contact): Promise<WhippyApiResponse<Contact>>;
    getContact(contact_id: string): Promise<WhippyApiResponse<Contact>>;
    listContacts(offset?: number, limit?: number): Promise<WhippyApiResponse<PaginatedResponse<Contact>>>;
    updateContact(contact_id: string, contact: Partial<Contact>): Promise<WhippyApiResponse<Contact>>;
    deleteContact(contact_id: string): Promise<WhippyApiResponse<void>>;
    createCampaign(campaign: Campaign): Promise<WhippyApiResponse<Campaign>>;
    getCampaign(campaign_id: string): Promise<WhippyApiResponse<Campaign>>;
    listCampaigns(): Promise<WhippyApiResponse<Campaign[]>>;
    sendCampaign(campaign_id: string): Promise<WhippyApiResponse<void>>;
    sendSMS(to: string, message: string, from?: string): Promise<WhippyApiResponse<Message>>;
    sendEmail(to: string, subject: string, message: string, from?: string): Promise<WhippyApiResponse<Message>>;
    createSequence(sequence: Sequence): Promise<WhippyApiResponse<Sequence>>;
    getSequence(sequence_id: string): Promise<WhippyApiResponse<Sequence>>;
    listSequences(): Promise<WhippyApiResponse<Sequence[]>>;
    createLead(lead: Lead): Promise<WhippyApiResponse<Lead>>;
    getConversation(conversation_id: string): Promise<WhippyApiResponse<Conversation>>;
    listConversations(offset?: number, limit?: number): Promise<WhippyApiResponse<PaginatedResponse<Conversation>>>;
    getCampaignAnalytics(campaign_id: string): Promise<WhippyApiResponse<Analytics>>;
}
//# sourceMappingURL=whippy-client.d.ts.map