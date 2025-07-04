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
  WhippyApiError,
  PaginatedResponse,
  Analytics,
  Channel,
  ChannelsResponse,
  OrganizationResponse,
  ContactSearchParams,
  EmailMessageRequest,
  EmailMessageResponse,
  Agent,
  AgentSearchParams,
  AgentsResponse,
  AgentCallRequest,
  AgentCallResponse,
  SmsMessageRequest,
  SmsMessageResponse,
} from '../types/whippy';

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
  private client: AxiosInstance;
  private api_key: string;

  constructor(config: WhippyConfig) {
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
    this.client.interceptors.response.use(
      response => response,
      error => {
        const errorData = error.response?.data as WhippyApiError;
        const status = error.response?.status;

        if (status === 429) {
          console.error('Whippy API Rate Limit Exceeded. Please wait before retrying.');
          console.error(
            'Rate Limits: Standard=25/sec, Time Consuming=10/min, High Limit=35-50/sec'
          );
        } else if (errorData?.errors && errorData.errors.length > 0) {
          console.error(
            'Whippy API Error:',
            errorData.errors[0].description,
            'Status:',
            errorData.status
          );
        } else {
          console.error('Whippy API Error:', error.response?.data || error.message);
        }
        throw error;
      }
    );
  }

  // Organization
  async getOrganization(): Promise<WhippyApiResponse<OrganizationResponse>> {
    try {
      const response: AxiosResponse = await this.client.get('/organization');
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  // Authentication validation helper
  async validateAuth(): Promise<boolean> {
    try {
      const response = await this.getOrganization();
      return response.success;
    } catch (error) {
      return false;
    }
  }

  // Contact Management
  async createContact(contact: Contact): Promise<WhippyApiResponse<Contact>> {
    try {
      const response: AxiosResponse = await this.client.post('/contacts', contact);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  async getContact(contact_id: string): Promise<WhippyApiResponse<Contact>> {
    try {
      const response: AxiosResponse = await this.client.get(`/contacts/${contact_id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  async listContacts(
    offset: number = 0,
    limit: number = 50
  ): Promise<WhippyApiResponse<PaginatedResponse<Contact>>> {
    try {
      const response: AxiosResponse = await this.client.get('/contacts', {
        params: { offset, limit },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async updateContact(
    contact_id: string,
    contact: Partial<Contact>
  ): Promise<WhippyApiResponse<Contact>> {
    try {
      const response: AxiosResponse = await this.client.put(`/contacts/${contact_id}`, contact);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deleteContact(contact_id: string): Promise<WhippyApiResponse<void>> {
    try {
      await this.client.delete(`/contacts/${contact_id}`);
      return { success: true, message: 'Contact deleted successfully' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async searchContacts(params: ContactSearchParams): Promise<WhippyApiResponse<Contact[]>> {
    try {
      const response: AxiosResponse = await this.client.post('/contacts/search', params);
      return { success: true, data: response.data.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  // Campaign Management
  async createCampaign(campaign: Campaign): Promise<WhippyApiResponse<Campaign>> {
    try {
      const response: AxiosResponse = await this.client.post('/campaigns/sms', campaign);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async getCampaign(campaign_id: string): Promise<WhippyApiResponse<Campaign>> {
    try {
      const response: AxiosResponse = await this.client.get(`/campaigns/${campaign_id}`);
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

  async sendCampaign(campaign_id: string): Promise<WhippyApiResponse<void>> {
    try {
      await this.client.post(`/campaigns/${campaign_id}/send`);
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

  async sendMessagingSMS(
    params: SmsMessageRequest
  ): Promise<WhippyApiResponse<SmsMessageResponse>> {
    try {
      const response: AxiosResponse = await this.client.post('/messaging/sms', params);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    message: string,
    from?: string
  ): Promise<WhippyApiResponse<Message>> {
    try {
      const payload = { to, subject, message, from };
      const response: AxiosResponse = await this.client.post('/messages/email', payload);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async sendMessagingEmail(
    params: EmailMessageRequest
  ): Promise<WhippyApiResponse<EmailMessageResponse>> {
    try {
      const response: AxiosResponse = await this.client.post('/messaging/email', params);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
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

  async getSequence(sequence_id: string): Promise<WhippyApiResponse<Sequence>> {
    try {
      const response: AxiosResponse = await this.client.get(`/sequences/${sequence_id}`);
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
  async getConversation(conversation_id: string): Promise<WhippyApiResponse<Conversation>> {
    try {
      const response: AxiosResponse = await this.client.get(`/conversations/${conversation_id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async listConversations(
    offset: number = 0,
    limit: number = 50
  ): Promise<WhippyApiResponse<PaginatedResponse<Conversation>>> {
    try {
      const response: AxiosResponse = await this.client.get('/conversations', {
        params: { offset, limit },
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Analytics
  async getCampaignAnalytics(campaign_id: string): Promise<WhippyApiResponse<Analytics>> {
    try {
      const response: AxiosResponse = await this.client.get(`/campaigns/${campaign_id}/analytics`);
      return { success: true, data: response.data };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Channels
  async listChannels(): Promise<WhippyApiResponse<ChannelsResponse>> {
    try {
      const response: AxiosResponse = await this.client.get('/channels');
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  async getChannel(channel_id: string): Promise<WhippyApiResponse<Channel>> {
    try {
      const response: AxiosResponse = await this.client.get(`/channels/${channel_id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  async createChannel(channel: Partial<Channel>): Promise<WhippyApiResponse<Channel>> {
    try {
      const response: AxiosResponse = await this.client.post('/channels', channel);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  async updateChannel(
    channel_id: string,
    channel: Partial<Channel>
  ): Promise<WhippyApiResponse<Channel>> {
    try {
      const response: AxiosResponse = await this.client.put(`/channels/${channel_id}`, channel);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  async deleteChannel(channel_id: string): Promise<WhippyApiResponse<void>> {
    try {
      await this.client.delete(`/channels/${channel_id}`);
      return { success: true, message: 'Channel deleted successfully' };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  // Agents
  async listAgents(params?: AgentSearchParams): Promise<WhippyApiResponse<AgentsResponse>> {
    try {
      const response: AxiosResponse = await this.client.get('/agents', {
        params: params || {},
      });
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  async getAgent(agent_id: string): Promise<WhippyApiResponse<Agent>> {
    try {
      const response: AxiosResponse = await this.client.get(`/agents/${agent_id}`);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }

  async initiateAgentCall(
    agent_id: string,
    params: AgentCallRequest
  ): Promise<WhippyApiResponse<AgentCallResponse>> {
    try {
      const response: AxiosResponse = await this.client.post(`/agents/${agent_id}/call`, params);
      return { success: true, data: response.data };
    } catch (error: any) {
      const errorData = error.response?.data as WhippyApiError;
      const errorMessage = errorData?.errors?.[0]?.description || error.message;
      return { success: false, error: errorMessage };
    }
  }
}
