import axios from 'axios';
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
export class WhippyClient {
    client;
    api_key;
    constructor(config) {
        this.api_key = config.api_key;
        this.client = axios.create({
            baseURL: config.base_url || 'https://api.whippy.co/v1',
            headers: {
                'X-WHIPPY-KEY': this.api_key,
                'Content-Type': 'application/json',
                'User-Agent': 'Whippy-MCP-Server/1.0.0',
            },
            timeout: 30000,
        });
        // Add response interceptor for error handling with rate limiting awareness
        this.client.interceptors.response.use(response => response, error => {
            const errorData = error.response?.data;
            const status = error.response?.status;
            if (status === 429) {
                console.error('Whippy API Rate Limit Exceeded. Please wait before retrying.');
                console.error('Rate Limits: Standard=25/sec, Time Consuming=10/min, High Limit=35-50/sec');
            }
            else if (errorData?.errors && errorData.errors.length > 0) {
                console.error('Whippy API Error:', errorData.errors[0].description, 'Status:', errorData.status);
            }
            else {
                console.error('Whippy API Error:', error.response?.data || error.message);
            }
            throw error;
        });
    }
    // Organization
    async getOrganization() {
        try {
            const response = await this.client.get('/organization');
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    // Authentication validation helper
    async validateAuth() {
        try {
            const response = await this.getOrganization();
            return response.success;
        }
        catch (error) {
            return false;
        }
    }
    // Contact Management
    async createContact(contact) {
        try {
            const response = await this.client.post('/contacts', contact);
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    async getContact(contact_id) {
        try {
            const response = await this.client.get(`/contacts/${contact_id}`);
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    async listContacts(offset = 0, limit = 50) {
        try {
            const response = await this.client.get('/contacts', {
                params: { offset, limit },
            });
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async updateContact(contact_id, contact) {
        try {
            const response = await this.client.put(`/contacts/${contact_id}`, contact);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async deleteContact(contact_id) {
        try {
            await this.client.delete(`/contacts/${contact_id}`);
            return { success: true, message: 'Contact deleted successfully' };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async searchContacts(params) {
        try {
            const response = await this.client.post('/contacts/search', params);
            return { success: true, data: response.data.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    // Campaign Management
    async createCampaign(campaign) {
        try {
            const response = await this.client.post('/campaigns/sms', campaign);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async getCampaign(campaign_id) {
        try {
            const response = await this.client.get(`/campaigns/${campaign_id}`);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async listCampaigns() {
        try {
            const response = await this.client.get('/campaigns');
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async sendCampaign(campaign_id) {
        try {
            await this.client.post(`/campaigns/${campaign_id}/send`);
            return { success: true, message: 'Campaign sent successfully' };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    // Messaging
    async sendSMS(to, message, from) {
        try {
            const payload = { to, message, from };
            const response = await this.client.post('/messages/sms', payload);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async sendMessagingSMS(params) {
        try {
            const response = await this.client.post('/messaging/sms', params);
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    async sendEmail(to, subject, message, from) {
        try {
            const payload = { to, subject, message, from };
            const response = await this.client.post('/messages/email', payload);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async sendMessagingEmail(params) {
        try {
            const response = await this.client.post('/messaging/email', params);
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    // Sequences
    async createSequence(sequence) {
        try {
            const response = await this.client.post('/sequences', sequence);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async getSequence(sequence_id) {
        try {
            const response = await this.client.get(`/sequences/${sequence_id}`);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async listSequences() {
        try {
            const response = await this.client.get('/sequences');
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    // Leads
    async createLead(lead) {
        try {
            const response = await this.client.post('/leads', lead);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    // Conversations
    async getConversation(conversation_id) {
        try {
            const response = await this.client.get(`/conversations/${conversation_id}`);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async listConversations(offset = 0, limit = 50) {
        try {
            const response = await this.client.get('/conversations', {
                params: { offset, limit },
            });
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    // Analytics
    async getCampaignAnalytics(campaign_id) {
        try {
            const response = await this.client.get(`/campaigns/${campaign_id}/analytics`);
            return { success: true, data: response.data };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    // Channels
    async listChannels() {
        try {
            const response = await this.client.get('/channels');
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    async getChannel(channel_id) {
        try {
            const response = await this.client.get(`/channels/${channel_id}`);
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    async createChannel(channel) {
        try {
            const response = await this.client.post('/channels', channel);
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    async updateChannel(channel_id, channel) {
        try {
            const response = await this.client.put(`/channels/${channel_id}`, channel);
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    async deleteChannel(channel_id) {
        try {
            await this.client.delete(`/channels/${channel_id}`);
            return { success: true, message: 'Channel deleted successfully' };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    // Agents
    async listAgents(params) {
        try {
            const response = await this.client.get('/agents', {
                params: params || {},
            });
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    async getAgent(agent_id) {
        try {
            const response = await this.client.get(`/agents/${agent_id}`);
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
    async initiateAgentCall(agent_id, params) {
        try {
            const response = await this.client.post(`/agents/${agent_id}/call`, params);
            return { success: true, data: response.data };
        }
        catch (error) {
            const errorData = error.response?.data;
            const errorMessage = errorData?.errors?.[0]?.description || error.message;
            return { success: false, error: errorMessage };
        }
    }
}
//# sourceMappingURL=whippy-client.js.map