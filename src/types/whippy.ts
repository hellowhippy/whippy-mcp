// Whippy AI API Types
export interface WhippyConfig {
  apiKey: string;
  baseUrl?: string;
}

export interface Contact {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  customFields?: Record<string, any>;
}

export interface Campaign {
  id?: string;
  name: string;
  message: string;
  contactIds?: string[];
  scheduledAt?: string;
  status?: 'draft' | 'scheduled' | 'sent' | 'failed';
}

export interface Message {
  id?: string;
  to: string;
  from?: string;
  message: string;
  type: 'sms' | 'email';
  status?: 'sent' | 'delivered' | 'failed';
  sentAt?: string;
}

export interface Sequence {
  id?: string;
  name: string;
  steps: SequenceStep[];
  isActive?: boolean;
}

export interface SequenceStep {
  id?: string;
  stepNumber: number;
  message: string;
  delayInHours?: number;
  type: 'sms' | 'email';
}

export interface Lead {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  source?: string;
  status?: string;
  createdAt?: string;
}

export interface Conversation {
  id?: string;
  contactId: string;
  messages: Message[];
  status?: 'open' | 'closed';
  lastMessageAt?: string;
}

export interface WhippyApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Analytics {
  campaignId?: string;
  messagesSent: number;
  messagesDelivered: number;
  messagesFailed: number;
  openRate?: number;
  clickRate?: number;
  responseRate?: number;
}
