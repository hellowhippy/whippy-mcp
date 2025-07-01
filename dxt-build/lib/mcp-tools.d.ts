import { z } from 'zod';
export declare const tools: ({
    name: string;
    description: string;
    schema: {
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        contactId?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        subject?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversationId?: undefined;
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
        contactId: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        subject?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversationId?: undefined;
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
        offset: z.ZodDefault<z.ZodNumber>;
        limit: z.ZodDefault<z.ZodNumber>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contactId?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        subject?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversationId?: undefined;
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
        to: z.ZodString;
        message: z.ZodString;
        from: z.ZodOptional<z.ZodString>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contactId?: undefined;
        offset?: undefined;
        limit?: undefined;
        subject?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversationId?: undefined;
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
        to: z.ZodString;
        subject: z.ZodString;
        message: z.ZodString;
        from: z.ZodOptional<z.ZodString>;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contactId?: undefined;
        offset?: undefined;
        limit?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversationId?: undefined;
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
        name: z.ZodString;
        message: z.ZodString;
        contact_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        scheduled_at: z.ZodOptional<z.ZodString>;
        email?: undefined;
        phone?: undefined;
        contactId?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        from?: undefined;
        subject?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversationId?: undefined;
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
        contactId?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        subject?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        source?: undefined;
        status?: undefined;
        conversationId?: undefined;
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
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contactId?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        subject?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
        conversationId?: undefined;
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
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        source: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
        contactId?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        subject?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        conversationId?: undefined;
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
        conversationId: z.ZodString;
        name?: undefined;
        email?: undefined;
        phone?: undefined;
        contactId?: undefined;
        offset?: undefined;
        limit?: undefined;
        to?: undefined;
        message?: undefined;
        from?: undefined;
        subject?: undefined;
        contact_ids?: undefined;
        scheduled_at?: undefined;
        campaignId?: undefined;
        source?: undefined;
        status?: undefined;
    };
    handler: (params: any, context?: any) => Promise<{
        content: {
            type: "text";
            text: any;
        }[];
    }>;
})[];
//# sourceMappingURL=mcp-tools.d.ts.map