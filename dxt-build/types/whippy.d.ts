export interface WhippyConfig {
  api_key: string;
  base_url?: string;
}
export interface Contact {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}
export interface Campaign {
  id?: string;
  name: string;
  message: string;
  contact_ids?: string[];
  scheduled_at?: string;
  status?: 'draft' | 'scheduled' | 'sent' | 'failed';
}
export interface Message {
  id?: string;
  to: string;
  from?: string;
  message: string;
  source_type: 'INBOUND' | 'OUTBOUND' | 'NOTE';
  type: 'sms' | 'email' | 'call' | 'note' | 'whatsapp';
  status?: 'sent' | 'delivered' | 'failed';
  sentAt?: string;
}
export interface Sequence {
  id?: string;
  name: string;
  steps: SequenceStep[];
}
export interface SequenceStep {
  id?: string;
  step_number: number;
  message: string;
  type: 'sms' | 'email';
}
export interface Lead {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  status?: string;
  created_at?: string;
}
export interface Conversation {
  id?: string;
  contact_id: string;
  messages: Message[];
  status?: 'open' | 'closed';
  last_message_at?: string;
}
export interface WhippyApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
export interface WhippyApiError {
  errors: Array<{
    description: string;
  }>;
  status: number;
}
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}
export interface Analytics {
  campaign_id?: string;
  messages_sent: number;
  messages_delivered: number;
  messages_failed: number;
  open_rate?: number;
  click_rate?: number;
  response_rate?: number;
}
//# sourceMappingURL=whippy.d.ts.map
