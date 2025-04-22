export interface IMailchimpEnvVars {
    apiKey: string;
    listId: string;
    serverPrefix: string;
}
export declare class MailchimpEnvVars implements IMailchimpEnvVars {
    apiKey: string;
    listId: string;
    serverPrefix: string;
    constructor();
}
