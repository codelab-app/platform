import * as env from 'env-var'

export interface IMailchimpEnvVars {
  apiKey: string
  listId: string
  serverPrefix: string
}

export class MailchimpEnvVars implements IMailchimpEnvVars {
  apiKey: string

  listId: string

  serverPrefix: string

  constructor() {
    this.apiKey = env.get('MAILCHIMP_API_KEY').required().asString()
    this.listId = env.get('MAILCHIMP_LIST_ID').required().asString()
    this.serverPrefix = env.get('MAILCHIMP_SERVER_PREFIX').required().asString()
  }
}
