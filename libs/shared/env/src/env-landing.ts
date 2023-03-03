import * as env from 'env-var'

interface EnvLanding {
  mailchimp: {
    list_id: string
    api_key: string
    server_prefix: string
  }
}

export const EnvLanding = (): EnvLanding => ({
  mailchimp: {
    api_key: env.get('MAILCHIMP_API_KEY').required().asString(),
    list_id: env.get('MAILCHIMP_LIST_ID').required().asString(),
    server_prefix: env.get('MAILCHIMP_SERVER_PREFIX').required().asString(),
  },
})
