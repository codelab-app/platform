import { env } from '../env'

export interface IMailchimpEnvVars {
  apiKey: string
  listId: string
  serverPrefix: string
}

export class MailchimpEnvVars implements IMailchimpEnvVars {
  get apiKey(): string {
    return env.get('MAILCHIMP_API_KEY').required().asString()
  }

  get listId(): string {
    return env.get('MAILCHIMP_LIST_ID').required().asString()
  }

  get serverPrefix(): string {
    return env.get('MAILCHIMP_SERVER_PREFIX').required().asString()
  }
}
