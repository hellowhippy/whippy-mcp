import { z } from 'zod';
export declare const tools: ({
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
} | {
    name: string;
    description: string;
    schema: {
        contact_id: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
    requireUserConfirmation?: undefined;
} | {
    name: string;
    description: string;
    schema: {
        offset: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
    requireUserConfirmation?: undefined;
} | {
    name: string;
    description: string;
    schema: {
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodDefault<z.ZodNumber>;
        contact_id?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
    requireUserConfirmation?: undefined;
} | {
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        to: z.ZodString;
        message: z.ZodString;
        from: z.ZodOptional<z.ZodString>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
} | {
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        to: z.ZodString;
        from: z.ZodString;
        body: z.ZodString;
        attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        schedule_at: z.ZodOptional<z.ZodString>;
        opt_in_to_all_channels: z.ZodOptional<z.ZodBoolean>;
        opt_in_to: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        message?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
} | {
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        to: z.ZodString;
        from: z.ZodString;
        subject: z.ZodString;
        body: z.ZodString;
        cc: z.ZodOptional<z.ZodString>;
        bcc: z.ZodOptional<z.ZodString>;
        reply_to: z.ZodOptional<z.ZodString>;
        sender_name: z.ZodOptional<z.ZodString>;
        attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        opt_in_to_all_channels: z.ZodOptional<z.ZodBoolean>;
        opt_in_to: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        message?: undefined;
        schedule_at?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
} | {
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        name: z.ZodString;
        message: z.ZodString;
        contact_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        scheduled_at: z.ZodOptional<z.ZodString>;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
} | {
    name: string;
    description: string;
    schema: {
        campaignId: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
    requireUserConfirmation?: undefined;
} | {
    name: string;
    description: string;
    schema: {
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
    requireUserConfirmation?: undefined;
} | {
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        campaignId: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
} | {
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
} | {
    name: string;
    description: string;
    schema: {
        conversation_id: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
    requireUserConfirmation?: undefined;
} | {
    name: string;
    description: string;
    schema: {
        campaign_id: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
    requireUserConfirmation?: undefined;
} | {
    name: string;
    description: string;
    schema: {
        name: z.ZodOptional<z.ZodString>;
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodDefault<z.ZodNumber>;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        agent_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
    requireUserConfirmation?: undefined;
} | {
    name: string;
    description: string;
    schema: {
        agent_id: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
        custom_placeholders_data?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
    requireUserConfirmation?: undefined;
} | {
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        agent_id: z.ZodString;
        from: z.ZodString;
        to: z.ZodString;
        custom_placeholders_data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        message?: undefined;
        body?: undefined;
        attachments?: undefined;
        schedule_at?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
        campaign_id?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
})[];
//# sourceMappingURL=mcp-tools.d.ts.map