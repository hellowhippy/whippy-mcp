import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  WhippyConfig,
  Contact,
  Campaign,
  Message,
  Sequence,
  Lead,
  Conversation,
  WhippyApiResponse,
  PaginatedResponse,
  Analytics
} from '../types/whippy.js';

export class WhippyClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(config: WhippyConfig) {
    this.apiKey = config.apiKey;
    
    this.client = axios.create({
      baseURL: config.baseUrl || 'https://api.whippy.co/v1',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Whippy-MCP-Server/1.0.0'
      },
      timeout: 30000
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('Whippy API Error:', error.response?.data || error.message);
        throw error;
      }
    );
  }

  // Contact Management
  async createContact(contact: Contact): Promise<WhippyApiResponse<Contact>> {
    try {
      const response: AxiosResponse = await this.client.post('/contacts', contact);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getContact(contactId: string): Promise<WhippyApiResponse<Contact>> {
    try {
      const response: AxiosResponse = await this.client.get(`/contacts/${contactId}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async listContacts(page: number = 1, limit: number = 50): Promise<WhippyApiResponse<PaginatedResponse<Contact>>> {
    try {
      const response: AxiosResponse = await this.client.get('/contacts', {
        params: { page, limit }
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async updateContact(contactId: string, contact: Partial<Contact>): Promise<WhippyApiResponse<Contact>> {
    try {
      const response: AxiosResponse = await this.client.put(`/contacts/${contactId}`, contact);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deleteContact(contactId: string): Promise<WhippyApiResponse<void>> {
    try {
      await this.client.delete(`/contacts/${contactId}`);
      return { success: true, message: 'Contact deleted successfully' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Campaign Management
  async createCampaign(campaign: Campaign): Promise<WhippyApiResponse<Campaign>> {
    try {
      const response: AxiosResponse = await this.client.post('/campaigns', campaign);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getCampaign(campaignId: string): Promise<WhippyApiResponse<Campaign>> {
    try {
      const response: AxiosResponse = await this.client.get(`/campaigns/${campaignId}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async listCampaigns(): Promise<WhippyApiResponse<Campaign[]>> {
    try {
      const response: AxiosResponse = await this.client.get('/campaigns');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async sendCampaign(campaignId: string): Promise<WhippyApiResponse<void>> {
    try {
      await this.client.post(`/campaigns/${campaignId}/send`);
      return { success: true, message: 'Campaign sent successfully' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Messaging
  async sendSMS(to: string, message: string, from?: string): Promise<WhippyApiResponse<Message>> {
    try {
      const payload = { to, message, from };
      const response: AxiosResponse = await this.client.post('/messages/sms', payload);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async sendEmail(to: string, subject: string, message: string, from?: string): Promise<WhippyApiResponse<Message>> {
    try {
      const payload = { to, subject, message, from };
      const response: AxiosResponse = await this.client.post('/messages/email', payload);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Sequences
  async createSequence(sequence: Sequence): Promise<WhippyApiResponse<Sequence>> {
    try {
      const response: AxiosResponse = await this.client.post('/sequences', sequence);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getSequence(sequenceId: string): Promise<WhippyApiResponse<Sequence>> {
    try {
      const response: AxiosResponse = await this.client.get(`/sequences/${sequenceId}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async listSequences(): Promise<WhippyApiResponse<Sequence[]>> {
    try {
      const response: AxiosResponse = await this.client.get('/sequences');
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Leads
  async createLead(lead: Lead): Promise<WhippyApiResponse<Lead>> {
    try {
      const response: AxiosResponse = await this.client.post('/leads', lead);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Conversations
  async getConversation(conversationId: string): Promise<WhippyApiResponse<Conversation>> {
    try {
      const response: AxiosResponse = await this.client.get(`/conversations/${conversationId}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async listConversations(page: number = 1, limit: number = 50): Promise<WhippyApiResponse<PaginatedResponse<Conversation>>> {
    try {
      const response: AxiosResponse = await this.client.get('/conversations', {
        params: { page, limit }
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Analytics
  async getCampaignAnalytics(campaignId: string): Promise<WhippyApiResponse<Analytics>> {
    try {
      const response: AxiosResponse = await this.client.get(`/campaigns/${campaignId}/analytics`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }
}