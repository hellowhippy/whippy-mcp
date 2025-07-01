import axios from 'axios';
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
        // Add response interceptor for error handling
        this.client.interceptors.response.use(response => response, error => {
            const errorData = error.response?.data;
            if (errorData?.errors && errorData.errors.length > 0) {
                console.error('Whippy API Error:', errorData.errors[0].description, 'Status:', errorData.status);
            }
            else {
                console.error('Whippy API Error:', error.response?.data || error.message);
            }
            throw error;
        });
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
    // Campaign Management
    async createCampaign(campaign) {
        try {
            const response = await this.client.post('/campaigns', campaign);
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
}
//# sourceMappingURL=whippy-client.js.map