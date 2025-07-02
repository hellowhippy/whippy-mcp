import { z } from 'zod';
export declare const tools: ({
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        external_id: z.ZodOptional<z.ZodString>;
        default_channel_id: z.ZodOptional<z.ZodString>;
        language: z.ZodOptional<z.ZodString>;
        address: z.ZodOptional<z.ZodObject<{
            address_line_one: z.ZodOptional<z.ZodString>;
            address_line_two: z.ZodOptional<z.ZodString>;
            city: z.ZodOptional<z.ZodString>;
            country: z.ZodOptional<z.ZodString>;
            post_code: z.ZodOptional<z.ZodString>;
            state: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            state?: string | undefined;
            address_line_one?: string | undefined;
            address_line_two?: string | undefined;
            city?: string | undefined;
            country?: string | undefined;
            post_code?: string | undefined;
        }, {
            state?: string | undefined;
            address_line_one?: string | undefined;
            address_line_two?: string | undefined;
            city?: string | undefined;
            country?: string | undefined;
            post_code?: string | undefined;
        }>>;
        birth_date: z.ZodOptional<z.ZodObject<{
            day: z.ZodOptional<z.ZodNumber>;
            month: z.ZodOptional<z.ZodNumber>;
            year: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            day?: number | undefined;
            month?: number | undefined;
            year?: number | undefined;
        }, {
            day?: number | undefined;
            month?: number | undefined;
            year?: number | undefined;
        }>>;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
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
} | {
    name: string;
    description: string;
    schema: {
        contact_id: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
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
        offset: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
        contact_id?: undefined;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
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
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        limit: z.ZodDefault<z.ZodNumber>;
        offset: z.ZodDefault<z.ZodNumber>;
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
        contact_id?: undefined;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
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
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        campaign_name?: undefined;
        campaign_id?: undefined;
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
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        schedule_at?: undefined;
        campaign_name?: undefined;
        campaign_id?: undefined;
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
} | {
    name: string;
    description: string;
    requireUserConfirmation: boolean;
    schema: {
        campaign_name: z.ZodString;
        body: z.ZodString;
        from: z.ZodString;
        to: z.ZodArray<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            phone: z.ZodString;
            external_id: z.ZodOptional<z.ZodString>;
            default_channel_id: z.ZodOptional<z.ZodString>;
            language: z.ZodOptional<z.ZodString>;
            address: z.ZodOptional<z.ZodObject<{
                address_line_one: z.ZodOptional<z.ZodString>;
                address_line_two: z.ZodOptional<z.ZodString>;
                city: z.ZodOptional<z.ZodString>;
                country: z.ZodOptional<z.ZodString>;
                post_code: z.ZodOptional<z.ZodString>;
                state: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                state?: string | undefined;
                address_line_one?: string | undefined;
                address_line_two?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                post_code?: string | undefined;
            }, {
                state?: string | undefined;
                address_line_one?: string | undefined;
                address_line_two?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                post_code?: string | undefined;
            }>>;
            birth_date: z.ZodOptional<z.ZodObject<{
                day: z.ZodOptional<z.ZodNumber>;
                month: z.ZodOptional<z.ZodNumber>;
                year: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                day?: number | undefined;
                month?: number | undefined;
                year?: number | undefined;
            }, {
                day?: number | undefined;
                month?: number | undefined;
                year?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            phone: string;
            name?: string | undefined;
            email?: string | undefined;
            external_id?: string | undefined;
            default_channel_id?: string | undefined;
            language?: string | undefined;
            address?: {
                state?: string | undefined;
                address_line_one?: string | undefined;
                address_line_two?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                post_code?: string | undefined;
            } | undefined;
            birth_date?: {
                day?: number | undefined;
                month?: number | undefined;
                year?: number | undefined;
            } | undefined;
        }, {
            phone: string;
            name?: string | undefined;
            email?: string | undefined;
            external_id?: string | undefined;
            default_channel_id?: string | undefined;
            language?: string | undefined;
            address?: {
                state?: string | undefined;
                address_line_one?: string | undefined;
                address_line_two?: string | undefined;
                city?: string | undefined;
                country?: string | undefined;
                post_code?: string | undefined;
            } | undefined;
            birth_date?: {
                day?: number | undefined;
                month?: number | undefined;
                year?: number | undefined;
            } | undefined;
        }>, "many">;
        attachments: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        schedule_at: z.ZodOptional<z.ZodString>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
        contact_id?: undefined;
        offset?: undefined;
        limit?: undefined;
        opt_in_to_all_channels?: undefined;
        opt_in_to?: undefined;
        subject?: undefined;
        cc?: undefined;
        bcc?: undefined;
        reply_to?: undefined;
        sender_name?: undefined;
        campaign_id?: undefined;
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
} | {
    name: string;
    description: string;
    schema: {
        campaign_id: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
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
        campaign_name?: undefined;
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
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
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
    requireUserConfirmation: boolean;
    schema: {
        campaign_id: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
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
        campaign_name?: undefined;
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
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
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
} | {
    name: string;
    description: string;
    schema: {
        conversation_id: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
        source?: undefined;
        status?: undefined;
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
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
        contact_id?: undefined;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
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
        agent_id: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
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
        external_id?: undefined;
        default_channel_id?: undefined;
        language?: undefined;
        address?: undefined;
        birth_date?: undefined;
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
        campaign_name?: undefined;
        campaign_id?: undefined;
        source?: undefined;
        status?: undefined;
        conversation_id?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
})[];
//# sourceMappingURL=mcp-tools.d.ts.map