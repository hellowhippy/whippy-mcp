// Whippy AI API Types
export interface WhippyConfig {
  api_key: string;
  base_url?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  type: string;
  state: string;
  system_created: boolean;
  converted?: any;
  organization_id: string;
  created_at: string;
  updated_at: string;
  created_by: User;
  updated_by: User;
}

export interface ContactTag {
  id: string;
  contact_id: string;
  tag_id: string;
  created_at: string;
  updated_at: string;
  tag: Tag;
}

export interface CommunicationPreference {
  id: string;
  contact_id: string;
  channel_id: string;
  opt_in: boolean;
  opt_in_date?: string;
  opt_out_date?: string;
  last_campaign_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  body: string;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface Contact {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  external_id?: string;
  state?: string;
  blocked?: boolean;
  created_at?: string;
  updated_at?: string;
  notes?: Note[];
  contact_tags?: ContactTag[];
  communication_preferences?: CommunicationPreference[];
}

export interface ContactSearchParams {
  name?: string;
  email?: string;
  phone?: string;
  limit?: number;
  offset?: number;
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

export interface EmailMessageRequest {
  to: string;
  from: string;
  subject: string;
  body: string;
  cc?: string;
  bcc?: string;
  reply_to?: string;
  sender_name?: string;
  attachments?: string[];
  opt_in_to_all_channels?: boolean;
  opt_in_to?: string[];
}

export interface EmailMessageResponse {
  id: string;
  contact_id: string;
  conversation_id: string;
  delivery_status: string;
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

export interface OpeningHours {
  closes_at: string;
  opens_at: string;
  state: string;
  weekday: string;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  phone: string;
  address?: string;
  emoji?: string;
  color?: string;
  timezone: string;
  is_hosted_sms: boolean;
  support_ai_agent: boolean;
  automatic_response_open?: string;
  automatic_response_closed?: string;
  send_automatic_response_when?: string;
  opening_hours?: OpeningHours[];
  created_at: string;
  updated_at: string;
}

export interface ChannelsResponse {
  data: Channel[];
  organization_id: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface OrganizationResponse {
  data: Organization;
}

export interface AgentProviderSettings {
  allow_user_dtmf: boolean;
  ambient_sound?: string | null;
  ambient_sound_volume: number;
  backchannel_frequency: number;
  backchannel_words?: string | null;
  begin_message_delay_ms: number;
  boosted_keywords?: string | null;
  denoising_mode: string;
  enable_backchannel: boolean;
  end_call_after_silence_ms: number;
  fallback_voice_ids?: string | null;
  interruption_sensitivity: number;
  language: string;
  max_call_duration_ms: number;
  normalize_for_speech: boolean;
  post_call_analysis_data?: Array<{
    description: string;
    examples?: string[];
    name: string;
    type: string;
    choices?: string[];
  }>;
  post_call_analysis_model?: string;
  pronunciation_dictionary?: string | null;
  reminder_max_count: number;
  reminder_trigger_ms: number;
  responsiveness: number;
  stt_mode: string;
  user_dtmf_options?: string | null;
  vocab_specialization: string;
  voice_id: string;
  voice_model: string;
  voice_speed: number;
  voice_temperature: number;
  voicemail_option?: {
    action: {
      type: string;
    };
  };
  volume: number;
}

export interface AgentVersion {
  agent_id: string;
  created_by_id: number;
  description?: string | null;
  id: string;
  inserted_at: string;
  llm_id: string;
  name?: string | null;
  organization_id: string;
  provider_settings: AgentProviderSettings;
}

export interface Agent {
  id: string;
  name?: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  created_by: User;
  updated_by: User;
  deleted_by?: User | null;
  current_version: AgentVersion;
  organization: Organization;
  versions?: AgentVersion[];
}

export interface AgentSearchParams {
  name?: string;
  limit?: number;
  offset?: number;
}

export interface AgentsResponse {
  data: Agent[];
  total: number;
}

export interface AgentCallRequest {
  from: string;
  to: string;
  custom_placeholders_data?: Record<string, string>;
}

export interface AgentCallResponse {
  message: string;
}

export interface SmsMessageRequest {
  to: string;
  from: string;
  body: string;
  attachments?: string[];
  schedule_at?: string;
  opt_in_to_all_channels?: boolean;
  opt_in_to?: string[];
}

export interface SmsMessageResponse {
  id: string;
  contact_id: string;
  conversation_id: string;
  delivery_status: string;
}
